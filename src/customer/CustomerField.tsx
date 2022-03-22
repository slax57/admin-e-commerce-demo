import { Avatar, Typography, Stack } from "@mui/material";
import * as React from "react";
import { useRecordContext } from "react-admin";
import { Customer } from "./customer";

export default function () {
  const customer: Customer = useRecordContext();

  if (!customer) return null;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt={`${customer.first_name} ${customer.last_name}`}
        src={customer.avatar}
        sx={{ width: 25, height: 25 }}
      />
      <Typography variant="body2">
        {customer.first_name} {customer.last_name}
      </Typography>
    </Stack>
  );
}
