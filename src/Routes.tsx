import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./hooks/useUser";
import Register from "./pages/user/Register";

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
        element: <Register />,
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
