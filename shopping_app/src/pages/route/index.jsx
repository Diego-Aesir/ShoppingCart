import React from "react";
import Home from "@/pages/index";
import Cart from "@/pages/cart";
import ProductPage from "@/components/Product/ProductPage/ProductPage";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
];

export default routes;