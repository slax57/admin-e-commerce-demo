import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";
import { ProductList } from "./product/ProductList";
import { CommandList } from "./command/CommandList";
import { CommandEdit } from "./command/CommandEdit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

const dataProvider = fakeDataProvider(
  generateData({ serializeDate: true }),
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="products"
        options={{ label: "Posters" }}
        list={ProductList}
        icon={PhotoSizeSelectActualIcon}
      />
      <Resource
        name="commands"
        options={{ label: "Orders" }}
        list={CommandList}
        edit={CommandEdit}
        icon={MonetizationOnIcon}
      />
    </Admin>
  );
}

export default App;
