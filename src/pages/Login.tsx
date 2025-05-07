import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login = () => {
    const { t, i18n } = useTranslation('Login')
    const navigate = useNavigate();
    const [ usename, setUsename ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ errorMsg, setErrorMsg ] = useState<string>('')

    const handleLogin = () => {
        setErrorMsg('')
        if(usename && password)
            navigate('/dashboard/products')
        else
            setErrorMsg(t('login_error'))
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4'>
            <h1 className='text-2xl font-bold text-center'>{ t('login') }</h1>
            <input
                type='text'
                placeholder={t('username')}
                value={usename}
                onChange={(e) => setUsename(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg'
            />
            <input
                type='password'
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg'
            />
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'
                onClick={handleLogin}
            >
                { t('login') }
            </button>
            { errorMsg && 
                <div className='text-red-400 text-sm text-center'>{ t(errorMsg) }</div>
            }

            <div className='flex justify-center space-x-2 pt-2'>
                <button className='text-sm text-blue-500' onClick={() => changeLanguage('en')}>EN</button>
                <button className='text-sm text-blue-500' onClick={() => changeLanguage('zh')}>中文</button>
            </div>
        </div>
    </div>)
}

export default Login