import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home";
import Detail from "../pages/detail";
import NotFound from "../pages/error";

import { Layout } from "../components/layout";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export { router };
