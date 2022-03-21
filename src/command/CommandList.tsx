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
} from "react-admin";
import CustomerAddressField from "../customer/CustomerAddressField";
import CustomerField from "../customer/CustomerField";
import { useSearchParams } from "react-router-dom";
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

export const CommandList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onTabChange = useCallback(
    (_, value) => {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set("status", value);
      setSearchParams(updatedSearchParams.toString());
    },
    [searchParams, setSearchParams]
  );
  const currentTab = useCallback(() => {
    return searchParams.get("status") || "ordered";
  }, [searchParams]);

  return (
    <List
      resource="commands"
      title="Orders"
      filters={filters}
      filter={{ status: currentTab() }}
    >
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
      </>
    </List>
  );
};
