import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'

import UserData from '../data/users.json'

import type { User } from '../types/user'

const Login = () => {
    const { t, i18n } = useTranslation('Login')
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme()
    const { setUser } = useUser()

    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ errorMsg, setErrorMsg ] = useState<string>('')

    const handleLogin = () => {
        setErrorMsg('')
        if(username && password) {
            const user = UserData.find((u) => (
                u.email === username
            ))
            
            if(user) {
                setUser(user as User)
                navigate('/dashboard')
            } else {
                setErrorMsg(t('login_error'))
            }
        } else {
            setErrorMsg(t('login_error'))
        }
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (<div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4'>
        <div className='w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>{ t('login') }</h1>
                <button
                    className='p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700'
                    onClick={toggleTheme}
                >
                    {  theme === 'dark'
                        ? (<SunIcon className='h-5 w-5 text-yellow-400' />)
                        : (<MoonIcon className='h-5 w-5 text-gray-600' />)
                    }
                </button>
            </div>
            <input
                type='text'
                placeholder={t('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
                type='password'
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors'
                onClick={handleLogin}
            >
                { t('login') }
            </button>
            { errorMsg && 
                <div className='text-red-400 text-sm text-center'>{ t(errorMsg) }</div>
            }

            <div className='flex justify-center space-x-3 pt-3 text-sm text-blue-600'>
                <button onClick={() => changeLanguage('en')}>EN</button>
                <button onClick={() => changeLanguage('zh')}>中文</button>
            </div>
        </div>
    </div>)
}

export default Login