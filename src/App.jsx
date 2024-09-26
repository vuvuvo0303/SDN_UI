import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./component/dashboard";
import Categories from "./pages/categories";
import Product from "./pages/product";
function App() {
  const router = createBrowserRouter([
    {
      path: "/y",
      element: <DashBoard />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
      children: [
        {
          path: "category",
          element: <Categories />,
        },
        {
          path: "product",
          element: <Product />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
