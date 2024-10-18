import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Users />
        },
        {
          path: "/search",
          element: <Search />
        }
      ]
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
