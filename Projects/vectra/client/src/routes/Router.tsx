import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import Discussions from "../pages/Discussions";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import { Protected } from "../components/Guard";

const router = createBrowserRouter([
  { path: "/", element: <Protected><Dashboard /></Protected> },
  { path: "/landing", element: <Landing /> },
  { path: "/applications", element: <Protected><Applications /></Protected> },
  { path: "/discussions", element: <Protected><Discussions /></Protected> },
  { path: "/settings", element: <Protected><Settings /></Protected> },
  // Placeholder: you’ll build real login/register next
  { path: "/login", element: <Navigate to="/landing" replace /> },
  { path: "*", element: <NotFound /> },
]);

export default router;