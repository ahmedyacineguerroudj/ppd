// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { BrowserRouter as Router } from 'react-router-dom';
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
