// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto-condensed/400.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import '@fontsource/source-sans-pro'; 
import '@fontsource/source-sans-pro/400.css'; 
import '@fontsource/source-sans-pro/600.css'; 
import '@fontsource/source-sans-pro/700.css';

const client = new ApolloClient({
  uri: 'https://65e8-196-134-108-13.ngrok-free.app', 
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
