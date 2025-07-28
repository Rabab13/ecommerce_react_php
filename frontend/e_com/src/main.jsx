import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
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


const httpLink = createHttpLink({
  uri: 'https://8490b31cadf5.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json', 
  }
});


const client = new ApolloClient({
  link: httpLink, 
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
