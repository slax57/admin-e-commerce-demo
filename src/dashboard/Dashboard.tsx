import {
  Card,
  Paper,
  CardContent,
  Container,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { useGetList, SimpleList } from "react-admin";
import { Customer } from "../customer/customer";

const cardSx = {
  minWidth: "230px",
};

const getMonthsBeforeNow = function (months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
};
const oneMonthBeforeNow = getMonthsBeforeNow(1);
const twoMonthsBeforeNow = getMonthsBeforeNow(2);

export const Dashboard = () => {
  const monthlyOrders = useGetList("commands", {
    filter: { date_gte: oneMonthBeforeNow.toISOString() },
  });
  const pendingOrders = useGetList("commands", {
    filter: { status: "ordered" },
    pagination: { page: 1, perPage: 25 },
  });
  const pendingReviews = useGetList("reviews", {
    filter: { status: "pending" },
    pagination: { page: 1, perPage: 25 },
  });
  const newCustomers = useGetList<Customer>("customers", {
    filter: {
      first_seen_gte: twoMonthsBeforeNow.toISOString(),
      has_ordered: true,
    },
    pagination: { page: 1, perPage: 25 },
  });

  return (
    <Container sx={{ padding: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="span 1">
          <Card component={Paper} sx={cardSx}>
            <CardContent>
              <DashboardCardHeader
                icon={<AttachMoneyIcon fontSize="large" color="secondary" />}
                title="Monthly Revenue"
                content="2 481 $US"
              />
            </CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1">
          <Card component={Paper} sx={cardSx}>
            <CardContent>
              <DashboardCardHeader
                icon={<ShoppingCartIcon fontSize="large" color="secondary" />}
                title="New Orders"
                content="17"
              />
            </CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%", ...cardSx }}>
            <CardContent>Pending Reviews</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%", ...cardSx }}>
            <CardContent>
              <DashboardCardHeader
                icon={<PersonAddIcon fontSize="large" color="secondary" />}
                title="New Customers"
                content={String(newCustomers.total)}
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
            </CardContent>
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
