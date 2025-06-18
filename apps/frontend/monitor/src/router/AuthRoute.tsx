import type { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
    children: React.ReactNode
}

const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />
    }
    return children
}

export default AuthRoute
