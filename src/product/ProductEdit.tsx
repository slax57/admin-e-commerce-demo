import {
  Box,
  Card,
  CardMedia,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
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
  ReferenceManyField,
  Datagrid,
  DateField,
  ReferenceField,
  TextField,
  WrapperField,
  Pagination,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { Poster } from "./product";
import { Category } from "../category/category";
import CustomerField from "../customer/CustomerField";
import { Rating } from "../review/Rating";

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
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          validate={[required(), number()]}
          sx={{ width: "7em" }}
        />
        <Stack direction="row">
          <NumberInput
            source="width"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
            validate={[required(), number()]}
            sx={{ mr: 2, width: "7em" }}
          />
          <NumberInput
            source="height"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
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
        <Box sx={{ maxWidth: "640px" }}>
          <RichTextInput
            source="description"
            validate={required()}
            label={false}
          />
        </Box>
      </FormTab>

      <FormTab label="reviews" path="reviews">
        <ReferenceManyField
          perPage={10}
          reference="reviews"
          target="product_id"
          pagination={
            <Pagination sx={{ alignSelf: "end", color: "text.secondary" }} />
          }
        >
          <Datagrid
            empty={
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography>No review yet on this poster</Typography>
                </Grid>
              </Grid>
            }
            bulkActionButtons={false}
            sx={{
              "& .RaDatagrid-headerCell": { fontWeight: "bold" },
              width: "100%",
            }}
          >
            <DateField source="date" />
            <ReferenceField source="customer_id" reference="customers">
              <CustomerField />
            </ReferenceField>
            <WrapperField label="Rating" sortBy="rating">
              <Rating />
            </WrapperField>
            <WrapperField label="Comment">
              <Box
                component="div"
                sx={{
                  overflow: "hidden",
                  maxWidth: "20em",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <TextField source="comment" />
              </Box>
            </WrapperField>
            <TextField source="status" />
          </Datagrid>
        </ReferenceManyField>
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
