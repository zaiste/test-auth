import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://zaiste.staging.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});