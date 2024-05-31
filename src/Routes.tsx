import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./hooks/useUser";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "user",
    Component: () => (
      <UserProvider>
        <Outlet />
      </UserProvider>
    ),
    children: [
      {
        path: "register",
        element: <div>Profile</div>,
      },
      {
        path: "pay",
        element: <div>Pay</div>,
      },
    ],
  },
  {
    path: "store",
    children: [
      {
        path: "payments",
        element: <div>Payments</div>,
      },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
