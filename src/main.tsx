
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const rootElement = document.getElementById("root");

// Make sure root element exists
if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the DOM");
}

// Create and render root
const root = createRoot(rootElement);
root.render(<App />);
