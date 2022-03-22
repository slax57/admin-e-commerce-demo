import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";

export const ProductList = () => (
  <List title="Posters">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="category_id" reference="categories">
        <TextField source="id" />
      </ReferenceField>
      <NumberField source="width" />
      <NumberField source="height" />
      <NumberField source="price" />
      <TextField source="thumbnail" />
      <TextField source="image" />
    </Datagrid>
  </List>
);
