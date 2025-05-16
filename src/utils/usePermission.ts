import { useUser } from '../contexts/UserContext'
import { PAGE_PERMISSIONS } from '../contants/permissions'

export const usePermission = () => {
    const { user } = useUser()

    const hasRole = (roles: string[]) => {
        if(!user?.role)
            return false

        return roles.includes(user.role)
    }

    const canAccess = (
        page: string,
        action: 'read' | 'create' | 'edit' | 'delete' = 'read'
    ) => {
        const pagePermissions = PAGE_PERMISSIONS[page]
        const allowedRole = pagePermissions?.[action] || []
        return hasRole(allowedRole)
    }

    return { hasRole, canAccess }
}