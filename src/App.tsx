import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";
import commands from "./command";
import products from "./product";

const dataProvider = fakeDataProvider(
  generateData({ serializeDate: true }),
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="products" {...products} />
      <Resource name="commands" {...commands} />
      <Resource name="categories" />
    </Admin>
  );
}

export default App;