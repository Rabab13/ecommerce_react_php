// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   // uri: 'http://localhost:8000/graphql',
//   uri: 'https://ecommercereactphp-production.up.railway.app/graphql',
//   credentials: 'include',
// });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
//   onError: ({ networkError, graphQLErrors }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path }) => {
//         console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
//       });
//     }
//     if (networkError) {
//       console.error(`[Network error]: ${networkError}`);
//     }
//   },
// });

// export default client;
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://ecommercereactphp-production.up.railway.app/graphql',
  credentials: 'include', // Required for cookies/sessions
});

const authLink = setContext((_, { headers }) => {
  // Get the origin dynamically from the browser
  const origin = window.location.origin;
  
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Origin': origin, // Explicitly send the origin
      'Accept': 'application/json',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default client;