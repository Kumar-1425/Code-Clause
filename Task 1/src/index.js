import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this import is correct
import App from './App';
import './index.css'; // Your CSS file if needed

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
