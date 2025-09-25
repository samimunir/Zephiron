// import { createBrowserRouter } from "react-router-dom";
// import Landing from "../pages/Landing";
// import Dashboard from "../pages/Dashboard";
// import Applications from "../pages/Applications";
// import Discussions from "../pages/Discussions";
// import Settings from "../pages/Settings";
// import NotFound from "../pages/NotFound";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import { Protected } from "../components/Guard";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <Dashboard />
//       </Protected>
//     ),
//   },
//   { path: "/landing", element: <Landing /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   {
//     path: "/applications",
//     element: (
//       <Protected>
//         <Applications />
//       </Protected>
//     ),
//   },
//   {
//     path: "/discussions",
//     element: (
//       <Protected>
//         <Discussions />
//       </Protected>
//     ),
//   },
//   {
//     path: "/settings",
//     element: (
//       <Protected>
//         <Settings />
//       </Protected>
//     ),
//   },
//   { path: "*", element: <NotFound /> },
// ]);

// export default router;

// import { createBrowserRouter } from "react-router-dom";
// import Landing from "../pages/Landing";
// import Dashboard from "../pages/Dashboard";
// import Applications from "../pages/Applications";
// import Discussions from "../pages/Discussions";
// import Thread from "../pages/Thread"; // <-- NEW
// import Settings from "../pages/Settings";
// import NotFound from "../pages/NotFound";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import { Protected } from "../components/Guard";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <Dashboard />
//       </Protected>
//     ),
//   },
//   { path: "/landing", element: <Landing /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },

//   {
//     path: "/applications",
//     element: (
//       <Protected>
//         <Applications />
//       </Protected>
//     ),
//   },

//   {
//     path: "/discussions",
//     element: (
//       <Protected>
//         <Discussions />
//       </Protected>
//     ),
//   },
//   {
//     path: "/discussions/:id", // <-- NEW route for thread detail
//     element: (
//       <Protected>
//         <Thread />
//       </Protected>
//     ),
//   },

//   {
//     path: "/settings",
//     element: (
//       <Protected>
//         <Settings />
//       </Protected>
//     ),
//   },

//   { path: "*", element: <NotFound /> },
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import Discussions from "../pages/Discussions";
import Thread from "../pages/Thread";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Protected } from "../components/Guard";

const router = createBrowserRouter([
  // Public homepage → your new Landing
  { path: "/", element: <Landing /> },

  // Auth pages (public)
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // App shell (protected)
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/applications",
    element: (
      <Protected>
        <Applications />
      </Protected>
    ),
  },
  {
    path: "/discussions",
    element: (
      <Protected>
        <Discussions />
      </Protected>
    ),
  },
  {
    path: "/discussions/:id",
    element: (
      <Protected>
        <Thread />
      </Protected>
    ),
  },
  {
    path: "/settings",
    element: (
      <Protected>
        <Settings />
      </Protected>
    ),
  },

  // 404
  { path: "*", element: <NotFound /> },
]);

export default router;
