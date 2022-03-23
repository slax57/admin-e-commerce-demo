import {
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
} from "react-admin";

const PostPagination = () => <Pagination rowsPerPageOptions={[12, 24, 48]} />;

const PosterDataGrid = () => {
  const { data } = useListContext();
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
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
      cols={isSmall ? 3 : isMedium ? 4 : isLarge ? 6 : 8}
    >
      {data.map((product) => {
        return (
          <ImageListItem key={product.id}>
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
        );
      })}
    </ImageList>
  );
};

export const ProductList = () => (
  <List title="Posters" pagination={<PostPagination />}>
    <PosterDataGrid />
  </List>
);
