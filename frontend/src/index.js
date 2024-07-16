import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { ClerkProvider } from "@clerk/clerk-react";
import { PUBLISHABLE_KEY } from './config.js'; 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ClerkProvider>
  </React.StrictMode>
);
