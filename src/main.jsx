import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <React.StrictMode> is used to highlight potential problems in an application. */} 
    <App />
  </React.StrictMode>
);
