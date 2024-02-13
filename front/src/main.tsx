import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./components/Home/Home.tsx";
import { Contei } from "./Contei.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contei",
    element: <Contei />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
