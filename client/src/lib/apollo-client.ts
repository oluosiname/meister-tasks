import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { createConsumer } from "@rails/actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { getMainDefinition } from "@apollo/client/utilities";

const cable = createConsumer(process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_URL);

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
});

const actionCableLink = new ActionCableLink({ cable });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  actionCableLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
