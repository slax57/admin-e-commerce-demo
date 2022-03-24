import { Card, CardMedia, Stack } from "@mui/material";
import * as React from "react";
import {
  Edit,
  useRecordContext,
  TabbedForm,
  FormTab,
  TextInput,
  required,
  number,
  NumberInput,
  SelectInput,
  useGetList,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { Poster } from "./product";
import { Category } from "../category/category";

const ProductTitle = () => {
  const record = useRecordContext();
  return <span>Poster #{record ? record.reference : ""}</span>;
};

const ProductEditForm = () => {
  const poster = useRecordContext<Poster>();
  const { data: categories } = useGetList<Category>("categories");
  return (
    <TabbedForm>
      <FormTab label="image">
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="240"
            image={poster.image}
            alt={poster.reference}
          />
        </Card>
        <TextInput
          source="image"
          validate={required()}
          sx={{ width: "40em" }}
        />
        <TextInput
          source="thumbnail"
          validate={required()}
          sx={{ width: "40em" }}
        />
      </FormTab>

      <FormTab label="details" path="details">
        <TextInput
          source="reference"
          validate={required()}
          sx={{ width: "15em" }}
        />
        <NumberInput
          source="price"
          validate={[required(), number()]}
          sx={{ width: "7em" }}
        />
        <Stack direction="row">
          <NumberInput
            source="width"
            validate={[required(), number()]}
            sx={{ mr: 2, width: "7em" }}
          />
          <NumberInput
            source="height"
            validate={[required(), number()]}
            sx={{ width: "7em" }}
          />
        </Stack>
        <SelectInput
          label="category"
          source="category_id"
          choices={categories}
          validate={required()}
          sx={{ width: "15em" }}
        />
        <NumberInput
          source="stock"
          validate={[required(), number()]}
          sx={{ width: "7em" }}
        />
      </FormTab>

      <FormTab label="description" path="description">
        <RichTextInput
          source="description"
          validate={required()}
          label={false}
        />
      </FormTab>
    </TabbedForm>
  );
};

export const ProductEdit = () => {
  return (
    <Edit resource="products" title={<ProductTitle />}>
      <ProductEditForm />
    </Edit>
  );
};
