import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'no-cacche',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const cache = new InMemoryCache({
  resultCaching: false,
});

const link = createHttpLink({
  uri: `https://stage55.datgate.com/core/graphql`,
});

const client = new ApolloClient({
  connectToDevTools: true,
  link,
  cache,
  defaultOptions,
});

export default client;
