import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'
import PromptModal from '../components/PromptModal'

import type { User } from '../types/user'

import usersData from '../data/users.json'

const UsersPage = () => {
    const { t } = useTranslation('Users')
    const { t: gt } = useTranslation('Global')
    const [ users, setUsers ] = useState<User[]>(usersData as User[])
    const [ selectedUser, setSelectedUser ] = useState<User | null>(null)
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ modeType, setModeType ] = useState<'view' | 'add' | 'edit' | null>(null)
    const [ deletingUser, setDeletingUser ] = useState<User | null>(null)
    
    const handleAddUser = () => {
        setSelectedUser(null)
        setModeType('add')
        setIsModalOpen(true)
    }

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setModeType('edit')
        setIsModalOpen(true)
    }

    const handleSave = (user: User) => {
        if(Number(user.id) === 0) {
            const newId = Math.max(...users.map(u => Number(u.id)), 0) + 1
            setUsers([...users, { ...user, id: newId }])
        } else {
            setUsers(users.map(u => u.id === user.id ? user : u))
        }
        setIsModalOpen(false)
    }

    const handleModalClose = () => {
        setSelectedUser(null)
        setIsModalOpen(false)
    }
    
    const handleDelete = (id: string | number) => {
        console.log('delete item id: ', + id)

        const target = users.find((p) => p.id === +id)
        if(target)
            setDeletingUser(target)
    }
    
    const confirmDelete = () => {
        if(deletingUser) {
            setUsers(users.filter((p) => p.id !== deletingUser.id))
            setDeletingUser(null)
        }
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
            onClose={handleModalClose}
            mode={modeType}
            selectedUser={selectedUser}
            onSave={handleSave}
        />

        <PromptModal
            title={gt('delete') + t('user')}
            open={!!deletingUser}
            onClose={() => setDeletingUser(null)}
            onConfirm={confirmDelete}
            prompts={<span>{ gt('deletePrompt') }: { deletingUser?.name }</span>}
        />
    </div>)
}

export default UsersPage
