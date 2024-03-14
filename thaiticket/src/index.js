import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Event from "./pages/Event";
import Login from "./pages/login";
import Test from "./pages/test";
import Show from "./pages/show";
import Zoneseat from "./pages/zoneseat";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import HeadEvent from "./components/HeadEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/show",
    element: <Show />,
  },
  {
    path: "/zoneseat",
    element: <Zoneseat />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
