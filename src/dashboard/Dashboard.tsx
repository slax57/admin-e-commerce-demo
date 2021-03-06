import {
  Card,
  Paper,
  CardContent,
  Container,
  Box,
  Divider,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DashboardCardHeader } from "./DashboardCardHeader";
import {
  useGetList,
  SimpleList,
  Link,
  useGetMany,
  NumberField,
  DateField,
} from "react-admin";
import { Customer } from "../customer/customer";
import { Command } from "../command/command";
import { Review } from "../review/review";
import { RatingField } from "../review/RatingField";
import { LineClampTextField } from "../common/LineClampTextField";

const cardSx = {
  minWidth: "230px",
};

const getMonthsBeforeNow = function (months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
};
const oneMonthBeforeNow = getMonthsBeforeNow(1);

const computeMonthlyRevenue = function (monthlyOrders?: Command[]): number {
  let amount = 0;
  if (monthlyOrders) {
    amount = monthlyOrders
      .map((order) => order.total)
      .reduce((prev, cur) => prev + cur, 0);
  }
  return amount;
};

const computeBasketSize = (command: Command): number => {
  return command.basket.reduce((prev, cur) => prev + cur.quantity, 0);
};
const itemSuffixes = new Map([
  ["one", "item"],
  ["other", "items"],
]);
const pr = new Intl.PluralRules();
const formatBasket = (command: Command): string => {
  const rule = pr.select(computeBasketSize(command));
  const suffix = itemSuffixes.get(rule);
  return `${computeBasketSize(command)} ${suffix}`;
};

export const Dashboard = () => {
  const pendingReviews = useGetList<Review>("reviews", {
    filter: { status: "pending" },
    pagination: { page: 1, perPage: 25 },
  });
  const reviewAuthors = useGetMany<Customer>("customers", {
    ids:
      pendingReviews.data && pendingReviews.data.length
        ? pendingReviews.data.map((review) => review.customer_id)
        : [],
  });
  const monthlyOrders = useGetList<Command>("commands", {
    filter: { date_gte: oneMonthBeforeNow.toISOString() },
  });
  const newCustomers = useGetMany<Customer>("customers", {
    ids:
      monthlyOrders.data && monthlyOrders.data.length
        ? monthlyOrders.data.map((order) => order.customer_id)
        : [],
  });
  const pendingOrders = monthlyOrders.data
    ? monthlyOrders.data.filter((order) => order.status === "ordered")
    : [];

  return (
    <Container sx={{ padding: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="span 1">
          <Card component={Paper} sx={cardSx}>
            <DashboardCardHeader
              icon={<AttachMoneyIcon fontSize="large" color="secondary" />}
              title="Monthly Revenue"
              content={`${computeMonthlyRevenue(
                monthlyOrders.data
              ).toLocaleString()} $US`}
            />
          </Card>
        </Box>

        <Box gridColumn="span 1">
          <Card component={Paper} sx={cardSx}>
            <DashboardCardHeader
              icon={<ShoppingCartIcon fontSize="large" color="secondary" />}
              title="New Orders"
              content={String(
                monthlyOrders.data ? monthlyOrders.data.length : 0
              )}
            />
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={cardSx}>
            <DashboardCardHeader
              icon={<CommentIcon fontSize="large" color="secondary" />}
              title="Pending Reviews"
              content={String(pendingReviews.data?.length || 0)}
            />
            <Divider />
            <SimpleList
              data={pendingReviews.data}
              resource="reviews"
              primaryText={(review) => (
                <RatingField record={review} label="Rating" sortBy="rating" />
              )}
              secondaryText={(review) => (
                <LineClampTextField record={review} source="comment" />
              )}
              leftAvatar={(review) => {
                if (!reviewAuthors.data) return null;
                const customer = reviewAuthors.data.find(
                  (authors) => authors.id === review.customer_id
                );
                if (!customer) return null;
                return (
                  <Avatar
                    alt={`${customer.first_name} ${customer.last_name}`}
                    src={customer.avatar}
                  />
                );
              }}
            />
            <Divider />
            <Button
              component={Link}
              to={"/reviews"}
              fullWidth
              sx={{ pt: 1, pb: 1 }}
            >
              See All Reviews
            </Button>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={cardSx}>
            <DashboardCardHeader
              icon={<PersonAddIcon fontSize="large" color="secondary" />}
              title="New Customers"
              content={String(newCustomers.data?.length || 0)}
            />
            <Divider />
            <SimpleList
              data={newCustomers.data}
              resource="customers"
              primaryText={(customer) =>
                `${customer.first_name} ${customer.last_name}`
              }
              leftAvatar={(customer) => (
                <Avatar
                  alt={`${customer.first_name} ${customer.last_name}`}
                  src={customer.avatar}
                />
              )}
            />
            <Divider />
            <Button
              component={Link}
              to={"/customers"}
              fullWidth
              sx={{ pt: 1, pb: 1 }}
            >
              See All Customers
            </Button>
          </Card>
        </Box>

        <Box gridColumn="span 2">
          <Card component={Paper} sx={cardSx}>
            <CardContent>30 Day Revenue History</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 2">
          <Card component={Paper} sx={cardSx}>
            <Typography variant="h5" padding={2}>
              Pending Orders
            </Typography>
            <SimpleList
              data={pendingOrders}
              resource="commands"
              primaryText={(order) => <DateField source="date" showTime />}
              secondaryText={(order) => {
                if (!newCustomers.data) return null;
                const customer = newCustomers.data.find(
                  (authors) => authors.id === order.customer_id
                );
                if (!customer) return null;
                return `by ${customer.first_name} ${
                  customer.last_name
                }, ${formatBasket(order)}`;
              }}
              tertiaryText={(order) => (
                <NumberField
                  source="total"
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
              leftAvatar={(order) => {
                if (!newCustomers.data) return null;
                const customer = newCustomers.data.find(
                  (authors) => authors.id === order.customer_id
                );
                if (!customer) return null;
                return (
                  <Avatar
                    alt={`${customer.first_name} ${customer.last_name}`}
                    src={customer.avatar}
                  />
                );
              }}
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
