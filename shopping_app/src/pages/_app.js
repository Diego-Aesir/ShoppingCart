import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

import routes from "./route";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [router, setRouter] = useState(null);
  
  useEffect(() => {
    const route = createBrowserRouter(routes);  
    setRouter(route);
  }, []);

  if (!router) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider router={router}>
        <Component {...pageProps} />
    </RouterProvider>
  );
}
