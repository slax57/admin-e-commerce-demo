import { Typography } from "@mui/material";
import * as React from "react";
import { useRecordContext } from "react-admin";
import { Customer } from "./customer";

export default function () {
  const customer: Customer = useRecordContext();
  return customer ? (
    <Typography variant="body2">
      {[customer.address, customer.city, customer.zipcode].join(", ")}
    </Typography>
  ) : null;
}
