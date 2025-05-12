import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import TextInputField from './TextInputField'

import type { User, UserForm } from '../types/user'

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    selectedUser: User | null;
    mode: 'add' | 'edit' | 'view' | null; 
}

const UserModal = (props: Props) => {
    const { open, onClose, onSave, selectedUser, mode } = props
    const { t } = useTranslation('Users')
    const { t: gt } = useTranslation('Global')

    const [formData, setFormData] = useState<UserForm>({
        name: '',
        email: '',
        password: '',
        role: 'staff',
    })

    useEffect(() => {
        if (selectedUser) {
            const { name, email, role } = selectedUser
            setFormData({
                name,
                email,
                password: '',
                role,
            })
        } else {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'staff',
            })
        }
    }, [selectedUser, mode])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    
        onSave({
            id: selectedUser?.id ?? 0,
            ...formData,
        })
    }

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'staff',
        })
        onClose && onClose()
    }

    if(!open)
        return null

  return (<Modal
        open={open}
        onClose={handleClose}
        title={mode === 'edit' ? gt('edit') : gt('add')}
        footer={(<>
            <button
                type='button'
                onClick={handleClose}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
            >
                {gt('cancel')}
            </button>
            <button
                type='submit'
                form='user-form'
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
                {gt('save')}
            </button>
        </>)}
        >
        <form
            id='user-form'
            onSubmit={handleSubmit} 
            className='space-y-4'
        >
            <TextInputField
                label={t('name')}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                readOnly={mode === 'view'}
            />
            <TextInputField
                label={t('email')}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                readOnly={mode === 'view'}
            />
            {mode !== 'view' && (
                <TextInputField
                    label={t('password')}
                    type='password'
                    value={formData.password!}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required={mode === 'add'}
                />
            )}
            <div>
                <label className='block text-sm mb-2'>{ t('role') }:</label>
                { formData?.role === 'customer'
                    ? (<span className='pl-4'>{formData.role}</span>)
                    : (<div className='flex gap-4'>
                        {(['admin', 'staff'] as const).map((role) => (
                            <label key={role} className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    name='role'
                                    value={role}
                                    checked={formData.role === role}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as User['role'] }))}
                                    readOnly={mode === 'view'}
                                    disabled={mode === 'view'}
                                />
                                <span>{t(role)}</span>
                            </label>
                        ))}
                    </div>)
                }
            </div>
        </form>
    </Modal>)
}

export default UserModal
