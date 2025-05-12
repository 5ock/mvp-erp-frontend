import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

import type { User } from '../types/user'

import usersData from '../data/users.json'

const UsersPage = () => {
    const { t } = useTranslation('Users')
    const { t: gt } = useTranslation('Global')
    const [users, setUsers] = useState<User[]>(usersData as User[])
    const [ selectedUser, setSelectedUser ] = useState<User | null>(null)
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ modeType, setModeType ] = useState<'view' | 'add' | 'edit' | null>(null)
    
    const handleAddUser = () => {
        setSelectedUser(null)
        setModeType('add')
        setIsModalOpen(true)
    }

    const handleEditUser = (user: User) => {

    }
    
    const handleDelete = () => {

    }

    const handleSaveUser = () => {

    }

    return (<div className='space-y-6'>
        <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold">{ t('userManagement') }</h1>
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                onClick={handleAddUser}
            >
                { gt('add') }
            </button>
        </div>

        <UserTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDelete}
        />

        <UserModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode={modeType}
            selectedUser={selectedUser}
            onSave={handleSaveUser}
        />
    </div>)
}

export default UsersPage
