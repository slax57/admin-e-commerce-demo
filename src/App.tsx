import React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";
import commands from "./command";
import products from "./product";
import { Dashboard } from "./dashboard/Dashboard";

const dataProvider = fakeDataProvider(
  generateData({ serializeDate: true }),
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
      <Resource name="products" {...products} />
      <Resource name="commands" {...commands} />
      <Resource name="categories" />
      <Resource name="reviews" />
    </Admin>
  );
}

export default App;
