import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default client;
