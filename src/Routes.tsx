import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./hooks/useUser";
import { Register } from "./pages/user/Register";
import Pay from "./pages/user/Pay";

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
        element: <Pay />,
      },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
