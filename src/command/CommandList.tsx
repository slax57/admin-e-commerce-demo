import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
  DateField,
  ArrayField,
  SingleFieldList,
  ChipField,
  FunctionField,
} from "react-admin";
import { Customer } from "../customer/customer";
import CustomerField from "../customer/CustomerField";

export const CommandList = () => (
  <List resource="commands" title="Orders">
    <Datagrid rowClick="edit">
      <DateField source="date" showTime />
      <TextField source="reference" />
      <ReferenceField source="customer_id" reference="customers">
        <CustomerField />
      </ReferenceField>
      <ReferenceField
        source="customer_id"
        reference="customers"
        link={false}
        label="Address"
      >
        <FunctionField
          render={(customer: Customer) =>
            [customer.address, customer.city, customer.zipcode].join(", ")
          }
        />
      </ReferenceField>
      <FunctionField
        label="Nb items"
        render={(record: { basket: any[] }) => `${record.basket?.length}`}
        textAlign="right"
      />
      <NumberField
        source="total"
        options={{ style: "currency", currency: "USD" }}
      />
    </Datagrid>
  </List>
);
