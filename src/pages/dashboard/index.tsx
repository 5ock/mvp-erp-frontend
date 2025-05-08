import { Navigate } from 'react-router-dom'

const Dashboard = () => {
    console.log(1213123)
    
    return (<Navigate to='/dashboard/products' replace />)
}

export default Dashboard