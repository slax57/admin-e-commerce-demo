import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";
import { ProductList } from "./product/ProductList";
import { CommandList } from "./command/CommandList";

const dataProvider = fakeDataProvider(
  generateData({ serializeDate: true }),
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posters" list={ProductList} />
      <Resource name="orders" list={CommandList} />
    </Admin>
  );
}

export default App;
