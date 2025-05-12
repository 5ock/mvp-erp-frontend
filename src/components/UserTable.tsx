import { useState, useMemo } from 'react'
import DataTable from './DataTable'
import { useTranslation } from 'react-i18next'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import type { User } from '../types/user'

type Props = {
    users: User[];
    onEdit: (u: User) => void;
    onDelete: (id: string | number) => void;
}

const UserTable = (props: Props) => {
    const { users, onEdit, onDelete } = props
    const { t } = useTranslation('Users')
    const [ sort, setSort ] = useState<{ field: string | number, direction: 'asc' | 'desc' }>({
        field: 'name',
        direction: 'asc'
    })

    const tableTh = [
      { id: 'name', label: t('name'), enableSort: true, isDataColumn: true },
      { id: 'email', label: t('email'), enableSort: true, isDataColumn: true },
      { id: 'role', label: t('role'), enableSort: true, isDataColumn: true },
      { id: 'actions', label: t('actions'), enableSort: false, isDataColumn: false },
    ]

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const field = sort.field as keyof User
            const direction = sort.direction === 'asc' ? 1 : -1
    
            const aVal = a[field]
            const bVal = b[field]
    
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal) * direction
            }
    
            return 0
        })
    }, [users, sort])

    return (<DataTable
        data={sortedUsers}
        columns={tableTh}
        renderRow={(user: User) => (<>
            <td className='p-2 border'>{user.name}</td>
            <td className='p-2 border'>{user.email}</td>
            <td className='p-2 border'>{user.role}</td>
            <td className='p-2 border'>
                { user.role !== 'admin' && <>
                    <button
                        onClick={() => onEdit(user)}
                        className='p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-300 rounded'
                    >
                        <PencilSquareIcon className='w-5 h-5' />
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className='p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-300 rounded'
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </>}
            </td>
        </>)}
        onSort={(newSort) => setSort(newSort)}
        sortState={sort}
    />)
}

export default UserTable