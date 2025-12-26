import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";

const router = createBrowserRouter ([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: 'send-parcel',
                element: <PrivateRoute><SendParcel /></PrivateRoute>,
                loader: () => fetch('./warehouses.json')
            }

        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels,
            }
        ]
    }
])

export default router; 