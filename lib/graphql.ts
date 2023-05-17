import { ApolloClient, InMemoryCache } from "@apollo/client";

import * as Constant from "./constant";

export const client = new ApolloClient({
  uri: Constant.SaleorURL,
  cache: new InMemoryCache(),
});