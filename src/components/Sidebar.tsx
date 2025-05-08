import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CubeIcon, ReceiptRefundIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

type SidebarProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const { t } = useTranslation('Sidebar')
    const location = useLocation()
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(isOpen 
                && sidebarRef.current 
                && !sidebarRef.current.contains(e.target as Node) 
                && window.innerWidth < 768
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, setIsOpen])

    useEffect(() => {
        if(window.innerWidth < 768)
            setIsOpen(false)
    }, [location.pathname, setIsOpen])

    return (<div
            ref={sidebarRef}
            className={`fixed z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:block`}>
        <div className='md:hidden flex justify-end p-4'>
            <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className='h-6 w-6 text-gray-600 dark:text-gray-300' />
            </button>
        </div>
        <nav className='p-4 space-y-2'>
            <NavLink 
                to='/dashboard/products'
                className={({ isActive }) => `flex items-center px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-bold' : ''}`}
            >
                <CubeIcon className='h-5 w-5 mr-2' />
                { t('products') }
            </NavLink>
            <NavLink 
                to='/dashboard/orders'
                className={({ isActive }) => `flex items-center px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-bold' : ''}`}
            >
                <ReceiptRefundIcon className='h-5 w-5 mr-2' />
                { t('orders') }
            </NavLink>
        </nav>
    </div>)
}

export default Sidebar