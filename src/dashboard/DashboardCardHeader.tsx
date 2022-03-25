import { Grid, Stack, Typography } from "@mui/material";

export const DashboardCardHeader = (props: {
  icon: JSX.Element;
  title: string;
  content: string;
}) => (
  <Grid
    container
    columns={2}
    spacing={2}
    justifyContent="space-between"
    alignItems="center"
  >
    <Grid item>{props.icon}</Grid>
    <Grid item>
      <Stack>
        <Typography variant="subtitle1" color="text.secondary">
          {props.title}
        </Typography>
        <Typography variant="h5" textAlign="right">
          {props.content}
        </Typography>
      </Stack>
    </Grid>
  </Grid>
);
