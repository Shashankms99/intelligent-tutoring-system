import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18+
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);