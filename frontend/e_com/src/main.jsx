// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://ecommercereactphp-production.up.railway.app/graphql', // Replace with your endpoint
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <CartProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </CartProvider> */}
    </ApolloProvider>
  </React.StrictMode>
);
