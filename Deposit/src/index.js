import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../deposit/src/index.css';
import App from '../../deposit/src/App';


import {
    createBrowserRouter,
    Router,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router={router}/>
);

reportWebVitals();
