import type { RouteObject } from 'react-router-dom'

import Login from './pages/Login'
import AuthenticatedLayout from './layouts/AuthenticatedLayout'
import Dashobard from './pages/dashboard/index'
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'
import Users from './pages/Users'

export const routes: RouteObject[] = [
    { path: '/', element: <Login />},
    {
        path: '/dashboard',
        element: <AuthenticatedLayout />,
        children: [
            { index: true, element: <Dashobard /> },
            { path: 'products', element: <Products /> },
            { path: 'Orders', element: <Orders /> }
        ]
    },
    {
        path: '/users',
        element: <AuthenticatedLayout />,
        children: [
            { index: true, element: <Users /> },
        ]
    }
]