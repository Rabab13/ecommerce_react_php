// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://f1a1-156-208-83-105.ngrok-free.app',  //updated ngrok URL
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
