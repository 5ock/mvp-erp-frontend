import { Outlet } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

const DashboardLayout = () => {
    return (<div className='flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
            <Header />

            <main className='flex-1 p-4 overflow-auto'>
                <Outlet />
            </main>
        </div>
    </div>)
}

export default DashboardLayout;