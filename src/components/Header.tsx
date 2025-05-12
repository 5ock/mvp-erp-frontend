import { useEffect, useState, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation} from 'react-i18next'
import { UserCircleIcon, SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline'
// import { Menu, MenuButton,MenuItems, MenuItem } from '@headlessui/react'

type HeaderProps = {
    onToggleSidebar: () => void;
    userName?: string;
}

const Header = ({ onToggleSidebar, userName='Admin' }: HeaderProps) => {
    const { theme, toggleTheme } = useTheme()
    const { i18n, t } = useTranslation('Global')
    const [ menuOpen, setMenuOpen ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleChangePassword = () => {
        alert('變更密碼功能尚未實作')
    }

    const handleLogout = () => {
        alert('登出功能尚未實作')
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (<div className='flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'>
        <div className='md:hidden'>
            <button onClick={onToggleSidebar}>
                <Bars3Icon className='h-6 w-6 text-gray-800 dark:text-white' />
            </button>
        </div>

        <div className='font-bold text-xl'>MVP ERP</div>

        <div className='relative' ref={menuRef}>
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className='flex items-center space-x-1 hover:opacity-80'
            >
                <span className='text-sm text-gray-800 dark:text-white'>{userName}</span>
                <UserCircleIcon className='w-6 h-6 text-gray-800 dark:text-white' />
            </button>
        
            { menuOpen && (
                <div className='absolute right-0 mt-2 w-52 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50'>
                    <button
                        onClick={handleChangePassword}
                        className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'
                    >
                        { t('changePassword') }
                    </button>
                    <button
                        onClick={handleLogout}
                        className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'
                    >
                        { t('logout') }
                    </button>
                    
                    <div className='border-t border-gray-200 dark:border-gray-600 my-1' />
                    
                    <div className='flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
                        onClick={toggleTheme}
                    >
                        <span>{ theme === 'dark' ? t('lightMode') : t('darkMode')}</span>
                        <div>
                            { theme === 'dark' ? (
                                <SunIcon className='h-5 w-5 text-yellow-400' />
                                ) : (
                                <MoonIcon className='h-5 w-5 text-gray-600' />
                            )}
                        </div>
                    </div>
                    <div className='px-4 py-2'>
                        <select
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            className='w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm'
                        >
                            <option value='en'>EN</option>
                            <option value='zh'>中文</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
        {/* <div className='flex items-center space-x-4'>
            <select
                value={i18n.language}
                className='bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm'
                onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
                <option value='en'>EN</option>
                <option value='zh'>中文</option>
            </select>
            <button onClick={toggleTheme}>
                { theme === 'dark'
                    ? (<SunIcon className='h-5 w-5 text-yellow-400' />)
                    : (<MoonIcon className='h-5 w-5 text-gray-600' />)
                }
            </button>
        </div> */}
    </div>)
}

export default Header