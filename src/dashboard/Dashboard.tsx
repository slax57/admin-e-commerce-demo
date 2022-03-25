import {
  Card,
  Paper,
  CardContent,
  Container,
  Box,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { useGetList, SimpleList, Link, useGetMany } from "react-admin";
import { Customer } from "../customer/customer";
import { Command } from "../command/command";

const cardSx = {
  minWidth: "230px",
};

const getMonthsBeforeNow = function (months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
};
const oneMonthBeforeNow = getMonthsBeforeNow(1);

export const Dashboard = () => {
  const pendingReviews = useGetList("reviews", {
    filter: { status: "pending" },
    pagination: { page: 1, perPage: 25 },
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
              content="2 481 $US"
            />
          </Card>
        </Box>

        <Box gridColumn="span 1">
          <Card component={Paper} sx={cardSx}>
            <DashboardCardHeader
              icon={<ShoppingCartIcon fontSize="large" color="secondary" />}
              title="New Orders"
              content="17"
            />
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%", ...cardSx }}>
            <CardContent>Pending Reviews</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%", ...cardSx }}>
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
            <CardContent>Pending Orders</CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
