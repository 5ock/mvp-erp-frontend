import { useTheme } from '../contexts/ThemeContext'
import { useTranslation} from 'react-i18next'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const Header = () => {
    const { theme, toggleTheme } = useTheme()
    const { i18n } = useTranslation()

    return (<div className='flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'>
        <div className='font-bold text-xl'>MVP ERP</div>
        <div className='flex items-center space-x-4'>
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
        </div>
    </div>)
}

export default Header