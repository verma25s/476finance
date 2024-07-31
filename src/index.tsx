// import the React library
import React from 'react';
// import ReactDOM for rendering components to the DOM
import ReactDOM from 'react-dom/client';
// import global CSS styles for the index page
import './index.css';
// import the main App component
import App from './App';
// import CookiesProvider for managing cookies in the app
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <CookiesProvider>
    <App />
  </CookiesProvider>

);
