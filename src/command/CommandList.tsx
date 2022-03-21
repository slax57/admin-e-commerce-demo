import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
  DateField,
  FunctionField,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  DateInput,
  NumberInput,
  NullableBooleanInput,
} from "react-admin";
import CustomerAddressField from "../customer/CustomerAddressField";
import CustomerField from "../customer/CustomerField";

const filters = [
  <TextInput source="q" label="Search" alwaysOn resettable />,
  <ReferenceInput source="customer_id" label="Customer" reference="customers">
    <AutocompleteInput
      optionText={(record) => `${record.first_name} ${record.last_name}`}
    />
  </ReferenceInput>,
  <DateInput label="Passed Since" source="date_gte" />,
  <DateInput label="Passed Before" source="date_lte" />,
  <NumberInput label="Min amount" source="total_gte" />,
  <NullableBooleanInput label="Returned" source="returned" />,
];

export const CommandList = () => (
  <List resource="commands" title="Orders" filters={filters}>
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
        <CustomerAddressField />
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
