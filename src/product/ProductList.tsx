import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  FunctionField,
  List,
  NumberField,
  useListContext,
  WrapperField,
} from "react-admin";

export const PosterDataGrid = () => {
  const { data } = useListContext();

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
      cols={3} // TODO: see if I can make this responsive...
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
  <List title="Posters">
    <PosterDataGrid />
  </List>
);
