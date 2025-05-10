import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/navbar/home";
import Signup from "../pages/navbar/signup";
import Login from "../pages/navbar/login";
import Products from "../pages/navbar/products";
import Details from "../pages/products/products.details"
import Create from "../pages/products/products.create";
import Update from "../pages/products/products.update";
import Delete from "../pages/products/products.delete";
import Category from "../pages/products/categories";
import ByCategory from "../pages/products/products.category";
import Reports from "../pages/products/reports";
import UpdateUser from "../pages/users/user.update";
import Users from "../pages/navbar/users";
import DeleteUser from "../pages/users/user.delete";
import ReportsUsers from "../pages/users/user.report";

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
                },
                {
                    path: "reports",
                    element: <Reports />
                }
            ]
        },
        { path: "/products/by-category/:id", element: <ByCategory /> },
        {
            path: "users", element: <Users />,
            children: [
                {
                    path: "update/:id",
                    element: <UpdateUser />
                },
                {
                    path: "delete/:id",
                    element: <DeleteUser />
                },
                {
                    path: "reports",
                    element: <ReportsUsers />
                },
            ]
        },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> }
    ]
} ])

export default router;
