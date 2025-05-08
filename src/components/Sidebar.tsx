import { NavLink } from 'react-router-dom'
import { CubeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
    const { t } = useTranslation('Sidebar')

    return (<div className='w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 hidden md:block'>
        <nav className='h-full p-4 space-y-2'>
            <NavLink 
                to='/dashboard/products'
                className={({ isActive }) => `flex items-center px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-bold' : ''}`}
            >
                <CubeIcon className='h-5 w-5 mr-2' />
                { t('products') }
            </NavLink>
            <NavLink 
                to='/dashboard/orders'
                className={({ isActive }) => `flex items-center px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-bold' : ''}`}
            >
                <ReceiptRefundIcon className='h-5 w-5 mr-2' />
                { t('orders') }
            </NavLink>
        </nav>
    </div>)
}

export default Sidebar