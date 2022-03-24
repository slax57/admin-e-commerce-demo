import { Card, Paper, CardContent, Container, Box } from "@mui/material";

export const Dashboard = () => {
  return (
    <Container sx={{ padding: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="span 1">
          <Card component={Paper}>
            <CardContent>Monthly revenue</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1">
          <Card component={Paper}>
            <CardContent>New Orders</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%" }}>
            <CardContent>Pending Reviews</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 1" gridRow="span 3">
          <Card component={Paper} sx={{ height: "100%" }}>
            <CardContent>New Customers</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 2">
          <Card component={Paper}>
            <CardContent>30 Day Revenue History</CardContent>
          </Card>
        </Box>

        <Box gridColumn="span 2">
          <Card component={Paper}>
            <CardContent>Pending Orders</CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
