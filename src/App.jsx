import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Redirected from "./pages/Redirected";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import UrlProvider from "./context";
import RequireAuth from "./components/requireAuth";
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
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link /> 
          </RequireAuth>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />;
    </UrlProvider>
  );
}

export default App;
