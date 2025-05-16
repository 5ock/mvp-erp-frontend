import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import TextInputField from './TextInputField'

type Props = {
    open: boolean;
    onClose: () => void;
}

const ChangePasswordModal = (props: Props) => {
    const { t: gt } = useTranslation('Global')
    const { open, onClose } = props

    const [ formData, setFormData ] = useState<{
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleClose = () => {
        setFormData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''

        })
        onClose()
    }

    const handleSubmit = () => {
        const { oldPassword, newPassword, confirmPassword } = formData
        if(!oldPassword || !newPassword || !confirmPassword)
            return


        onClose()
    }

    if(!open)
        return null

    return (<Modal
        open={open}
        onClose={handleClose}
        title={gt('changePassword')}
        footer={<>
            <button
                type='button'
                onClick={handleClose}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
            >
                {gt('cancel')}
            </button>
            <button
                type='submit'
                form='change-password-form'
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
                {gt('save')}
            </button>
        </>}
    >
        <form id='change-password-form'
            onSubmit={handleSubmit}
        >
            <TextInputField
                type='password'
                label={gt('oldPassword')}
                value={formData.oldPassword}
                onChange={(e) => setFormData((prev) => ({...prev, oldPassword: e.target.value}))}
                required
            />
            <TextInputField
                type='password'
                label={gt('newPassword')}
                value={formData.newPassword}
                onChange={(e) => setFormData((prev) => ({...prev, newPassword: e.target.value}))}
                required
            />
            <TextInputField
                type='password'
                label={gt('confirmPassword')}
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({...prev, confirmPassword: e.target.value}))}
            />
        </form>
    </Modal>)

}

export default ChangePasswordModal