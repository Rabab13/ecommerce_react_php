import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($categoryId: ID, $categoryName: String) {
    productsByCategory(categoryId: $categoryId, categoryName: $categoryName) {
      id
      name
      inStock
      gallery {
        id
        image_url
      }
      description
      category {
        id
        name
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;
export const INSERT_ORDER_MUTATION = gql`
  mutation InsertOrder($input: InsertOrderInput!) {
    insertOrder(input: $input) {
      id
      total_amount
      currency
      items {
        productId
        productName
        quantity
        price
        attributes {
          name
          value
        }
      }
    }
  }
`;
