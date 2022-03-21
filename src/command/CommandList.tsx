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
} from "react-admin";

export const CommandList = () => (
  <List resource="commands" title="Orders">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="reference" />
      <DateField source="date" />
      <ReferenceField source="customer_id" reference="customers">
        <TextField source="id" />
      </ReferenceField>
      <ArrayField source="basket">
        <SingleFieldList>
          <ChipField source="product_id" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="total" />
    </Datagrid>
  </List>
);
