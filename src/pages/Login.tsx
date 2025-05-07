import { useTranslation } from 'react-i18next'

const Login = () => {
    const { t, i18n } = useTranslation();

    return (<>
        <div className='text-red-500'>login page</div>
        <div>{ t('login') }</div>
    </>)
}

export default Login