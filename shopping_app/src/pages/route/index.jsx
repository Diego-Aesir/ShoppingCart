import Home from "@/pages/index";
import Cart from "@/pages/cart";
import Product from "@/components/Product/Product";

const routes = [
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/cart',
        element: <Cart/>
    },
    {
        path: '/product/:name',
        element: <Product/>
    }
];

export default routes;