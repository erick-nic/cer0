import { createBrowserRouter } from "react-router-dom";
import App from "../../App"
import Home from "../pages/home";
import Contacts from "../pages/contacts";
import About from "../pages/about";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Products from "../pages/products";
import Details from "../pages/products/products.details"
import Create from "../pages/products/products.create";
import Users from "../pages/users";
import Shop from "../pages/shop";
import Report from "../pages/products/reports/to-exel";

const router = createBrowserRouter([ {
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <Home /> },
        {
            path: "products",
            element: <Products />,
            children: [
                {
                    path: "details/:id",
                    element: <Details />
                },
                {
                    path: "create/",
                    element: <Create />
                },
                {
                    path: "reports/to-excel/",
                    element: <Report />
                }
            ]
        },
        { path: "users", element: <Users /> },
        { path: "shop", element: <Shop /> },
        { path: "contacts", element: <Contacts /> },
        { path: "about", element: <About /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> }
    ]
} ])

export default router;
