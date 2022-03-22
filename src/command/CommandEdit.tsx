import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  SelectInput,
  useRecordContext,
  DateField,
  BooleanInput,
  FunctionField,
  EmailField,
  ArrayField,
  NumberField,
  FieldTitle,
  DateInput,
  Labeled,
} from "react-admin";
import { Customer } from "../customer/customer";

const CommandTitle = () => {
  const record = useRecordContext();
  return <span>Order {record ? record.reference : ""}</span>;
};

const CommandEditOrderFragment = () => {
  return (
    <>
      <Typography variant="h6">Order</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Labeled label="Date">
            <DateField source="date" />
          </Labeled>
        </Grid>
        <Grid item xs={6}>
          <Labeled label="Reference">
            <TextField source="reference" />
          </Labeled>
        </Grid>
        <Grid item xs={6}>
          <SelectInput
            source="status"
            choices={[
              { id: "delivered", name: "delivered" },
              { id: "ordered", name: "ordered" },
              { id: "cancelled", name: "cancelled" },
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <BooleanInput label="Returned" source="returned" />
        </Grid>
      </Grid>
    </>
  );
};

const CommandEditCustomerFragment = () => {
  return (
    <>
      <Typography variant="h6">Customer</Typography>
      <Stack>
        <ReferenceField source="customer_id" reference="customers">
          <FunctionField
            render={(customer: Customer) =>
              `${customer.first_name} ${customer.last_name}`
            }
          />
        </ReferenceField>
        <ReferenceField source="customer_id" reference="customers">
          <EmailField source="email" />
        </ReferenceField>
      </Stack>
    </>
  );
};

const CommandEditAddressFragment = () => {
  return (
    <>
      <Typography variant="h6">Shipping Address</Typography>
      <ReferenceField source="customer_id" reference="customers" link={false}>
        <Stack>
          <FunctionField
            render={(customer: Customer) =>
              `${customer.first_name} ${customer.last_name}`
            }
          />
          <TextField source="address" />
          <FunctionField
            render={(customer: Customer) =>
              [customer.city, customer.zipcode].join(", ")
            }
          />
        </Stack>
      </ReferenceField>
    </>
  );
};

const CommandEditBasketFragment = () => {
  return (
    <>
      <Typography variant="h6">Items</Typography>
      <ArrayField source="basket">
        <Datagrid
          bulkActionButtons={false}
          sx={{
            "& .RaDatagrid-headerCell": { fontWeight: "bold" },
            width: "100%",
          }}
          size="medium"
        >
          <ReferenceField
            source="product_id"
            reference="products"
            label="Reference"
          >
            <TextField source="reference" />
          </ReferenceField>
          <ReferenceField
            source="product_id"
            reference="products"
            label="Unit Price"
            link={false}
          >
            <NumberField
              source="price"
              options={{ style: "currency", currency: "USD" }}
            />
          </ReferenceField>
          <NumberField label="Quantity" source="quantity" />
          {/* TODO - Total */}
        </Datagrid>
      </ArrayField>
    </>
  );
};

const CommandEditTotalsFragment = () => {
  return (
    <>
      <Typography variant="h6">Totals</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow key="total_ex_taxes">
              <TableCell component="th" scope="row">
                Sum
              </TableCell>
              <TableCell align="right">
                <NumberField
                  source="total_ex_taxes"
                  options={{ style: "currency", currency: "USD" }}
                />
              </TableCell>
            </TableRow>
            <TableRow key="delivery_fees">
              <TableCell component="th" scope="row">
                Delivery
              </TableCell>
              <TableCell align="right">
                <NumberField
                  source="delivery_fees"
                  options={{ style: "currency", currency: "USD" }}
                />
              </TableCell>
            </TableRow>
            <TableRow key="taxes">
              <TableCell component="th" scope="row">
                <FunctionField
                  render={(order: { tax_rate: any }) =>
                    `Tax (${order.tax_rate * 100} %)`
                  }
                />
              </TableCell>
              <TableCell align="right">
                <NumberField
                  source="taxes"
                  options={{ style: "currency", currency: "USD" }}
                />
              </TableCell>
            </TableRow>
            <TableRow key="total">
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                <NumberField
                  source="total"
                  options={{ style: "currency", currency: "USD" }}
                  sx={{ fontWeight: "bold" }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const CommandEdit = () => (
  <Edit resource="commands" title={<CommandTitle />}>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CommandEditOrderFragment />
        </Grid>
        <Grid item container xs={4} spacing={2} direction="column">
          <Grid item>
            <CommandEditCustomerFragment />
          </Grid>
          <Grid item>
            <CommandEditAddressFragment />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CommandEditBasketFragment />
        </Grid>
        <Grid item xs={12}>
          <CommandEditTotalsFragment />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
