import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/navbar/home";
import Contacts from "../pages/navbar/contacts";
import About from "../pages/navbar/about";
import Signup from "../pages/navbar/signup";
import Login from "../pages/navbar/login";
import Products from "../pages/navbar/products";
import Details from "../pages/products/products.details"
import Create from "../pages/products/products.create";
import Update from "../pages/products/products.update";
import Delete from "../pages/products/products.delete";
import Category from "../pages/products/categories";
import Users from "../pages/navbar/users";
import Report from "../pages/products/reports/to-excel";
import ByCategory from "../pages/products/products.category";

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
                    path: "update/:id",
                    element: <Update />
                },
                {
                    path: "create/",
                    element: <Create />
                },
                {
                    path: "delete/:id",
                    element: <Delete />
                },
                {
                    path: "create/category",
                    element: <Category />
                }
            ]
        },
        { path: "/products/by-category/:id", element: <ByCategory /> },
        { path: "/products/reports/to-excel", element: <Report /> },
        { path: "users", element: <Users /> },
        { path: "contacts", element: <Contacts /> },
        { path: "about", element: <About /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> }
    ]
} ])

export default router;
