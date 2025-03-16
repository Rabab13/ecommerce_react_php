// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });


// export const GET_PRODUCTS = gql`
//   query GetProducts {
//     products {
//       id
//       name
//       price
//       image
//     }
//   }
// `;

// export const GET_PRODUCT_DETAILS = gql`
//   query GetProductDetails($id: ID!) {
//     product(id: $id) {
//       id
//       name
//       price
//       image
//       description
//     }
//   }
// `;



// export default client;