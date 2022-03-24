import {
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import {
  FunctionField,
  List,
  NumberField,
  useListContext,
  WrapperField,
  Pagination,
  ExportButton,
  SortButton,
  TopToolbar,
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetList,
  Link,
} from "react-admin";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Category } from "../category/category";
import { capitalize } from "../common/utils";

const PostPagination = () => <Pagination rowsPerPageOptions={[12, 24, 48]} />;

const ListActions = () => (
  <TopToolbar>
    <SortButton fields={["reference", "sales", "stock"]} />
    <ExportButton />
  </TopToolbar>
);

const SalesFilter = () => (
  <FilterList label="Sales" icon={<MonetizationOnIcon />}>
    <FilterListItem
      label="Best sellers"
      value={{
        sales_gt: 25,
        sales_lte: undefined,
        sales: undefined,
      }}
    />
    <FilterListItem
      label="Average"
      value={{
        sales_gt: 10,
        sales_lte: 25,
        sales: undefined,
      }}
    />
    <FilterListItem
      label="Low"
      value={{
        sales_gt: 0,
        sales_lte: 10,
        sales: undefined,
      }}
    />
    <FilterListItem
      label="Never sold"
      value={{
        sales_gt: undefined,
        sales_lte: undefined,
        sales: 0,
      }}
    />
  </FilterList>
);

const StockFilter = () => (
  <FilterList label="Stock" icon={<BarChartIcon />}>
    <FilterListItem
      label="Out of stock"
      value={{
        stock_gt: undefined,
        stock_lt: undefined,
        stock: 0,
      }}
    />
    <FilterListItem
      label="1 - 9 items"
      value={{
        stock_gt: 0,
        stock_lt: 10,
        stock: undefined,
      }}
    />
    <FilterListItem
      label="10 - 49 items"
      value={{
        stock_gt: 10,
        stock_lt: 50,
        stock: undefined,
      }}
    />
    <FilterListItem
      label="50 items &amp; more"
      value={{
        stock_gt: 50,
        stock_lt: undefined,
        stock: undefined,
      }}
    />
  </FilterList>
);

const CategoryFilter = () => {
  const { data: categories } = useGetList<Category>("categories");
  if (!categories) return null;
  return (
    <FilterList label="Categories" icon={<LocalOfferIcon />}>
      {categories
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => (
          <FilterListItem
            label={capitalize(category.name)}
            key={category.id}
            value={{ category_id: category.id }}
          />
        ))}
    </FilterList>
  );
};

const FilterSidebar = () => (
  <Card
    sx={{
      order: -1, // display on the left rather than on the right of the list
      width: 250,
      minWidth: 250,
      mr: 2,
      mt: "64px",
      mb: "52px",
    }}
  >
    <CardContent>
      <FilterLiveSearch source="q" />
      <SalesFilter />
      <StockFilter />
      <CategoryFilter />
    </CardContent>
  </Card>
);

const PosterDataGrid = () => {
  const { data } = useListContext();
  const isMedium = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const isLarge = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  if (!data) return null;

  return (
    <ImageList
      sx={{
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
        margin: 0,
      }}
      rowHeight={180}
      gap={1}
      cols={isMedium ? 3 : isLarge ? 4 : 6}
    >
      {data.map((product) => {
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ImageListItem>
              <img
                src={product.thumbnail}
                alt={product.reference}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, " +
                    "rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={product.reference}
                subtitle={
                  <WrapperField>
                    <FunctionField
                      record={product}
                      render={(record: any) =>
                        `${record.width}x${record.height}, `
                      }
                    />
                    <NumberField
                      record={product}
                      source="price"
                      options={{ style: "currency", currency: "USD" }}
                    />
                  </WrapperField>
                }
                position="bottom"
              />
            </ImageListItem>
          </Link>
        );
      })}
    </ImageList>
  );
};

export const ProductList = () => (
  <List
    title="Posters"
    pagination={<PostPagination />}
    actions={<ListActions />}
    aside={<FilterSidebar />}
  >
    <PosterDataGrid />
  </List>
);
