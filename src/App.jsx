import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Redirected from "./pages/Redirected";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/:id ",
        element: <Redirected />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/link/:id",
        element: <Link />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
