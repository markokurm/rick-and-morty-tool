import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Rick and Morty GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;