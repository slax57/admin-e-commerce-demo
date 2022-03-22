import { Box, Tabs, Tab } from "@mui/material";
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
  useListContext,
} from "react-admin";
import { Customer } from "../customer/customer";
import CustomerField from "../customer/CustomerField";
import { useCallback } from "react";

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

export const TabbedCommandList = () => {
  const { filterValues, setFilters, displayedFilters } = useListContext();

  const onTabChange = useCallback(
    (_: any, value: string) => {
      const updatedFilterValues = { ...filterValues, status: value };
      setFilters(updatedFilterValues, displayedFilters);
    },
    [filterValues, setFilters, displayedFilters]
  );
  const currentTab = useCallback(() => {
    return filterValues?.status || "ordered";
  }, [filterValues]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab()} onChange={onTabChange} variant="fullWidth">
          <Tab label="Ordered" value="ordered" />
          <Tab label="Delivered" value="delivered" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>
      </Box>
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
    </>
  );
};

export const CommandList = () => {
  return (
    <List resource="commands" title="Orders" filters={filters}>
      <TabbedCommandList />
    </List>
  );
};
