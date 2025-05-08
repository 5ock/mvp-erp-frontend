import type { RouteObject } from 'react-router-dom'

import Login from './pages/Login'
import DashboardLayout from './pages/dashboard/Layout'
import Dashobard from './pages/dashboard/index'
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'

export const routes: RouteObject[] = [
    { path: '/', element: <Login />},
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Dashobard /> },
            { path: 'products', element: <Products /> },
            { path: 'Orders', element: <Orders /> }
        ]
    }
]