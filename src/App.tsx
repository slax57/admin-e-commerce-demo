import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";
import { ProductList } from "./product/ProductList";
import { CommandList } from "./command/CommandList";
import { CommandEdit } from "./command/CommandEdit";

const dataProvider = fakeDataProvider(
  generateData({ serializeDate: true }),
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" list={ProductList} />
      <Resource name="commands" list={CommandList} edit={CommandEdit} />
    </Admin>
  );
}

export default App;
