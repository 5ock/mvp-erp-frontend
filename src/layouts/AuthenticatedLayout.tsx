import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const AuthenticatedLayout = () => {
    const [ isSidebarOpen, setSidebarOpen ] = useState<boolean>(false)

    return (<div className='flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white'>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        <div className='flex-1 flex flex-col'>
            <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen) } />

            <main className='flex-1 p-4 overflow-auto'>
                <Outlet />
            </main>
        </div>
    </div>)
}

export default AuthenticatedLayout;