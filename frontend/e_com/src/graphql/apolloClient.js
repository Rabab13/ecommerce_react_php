import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/',
  useGETForQueries: false,
  fetchOptions: {
    method: 'POST'
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken'); 
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      console.error('GraphQL Errors:', graphQLErrors);
    }
    if (networkError) {
      console.error('Network Error:', networkError);
    }
  },
});

export default client;
