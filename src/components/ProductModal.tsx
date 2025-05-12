import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import TextInputField from './TextInputField'

import type { Product, ProductForm } from '../types/product'

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (p: Product) => void;
    product: Product | null;
    mode: 'add' | 'edit' | 'view' | null; 
}

const ProductModal =(props: Props) => {
    const { open, onClose, onSave, product, mode } = props
    const { t } = useTranslation('Products')
    const { t: gt } = useTranslation('Global')

    const [ formData, setFormData ] = useState<ProductForm>({
        name: '',
        price: 0,
        stock: 0
    })

    useEffect(() => {
        if(product) {
            const { name, price, stock } = product
            setFormData({ name, price, stock })
        } else {
            setFormData({ name: '', price: 0, stock: 0})
        }
    }, [product])

    if(!open)
        return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            id: product?.id ?? 0,
            ...formData
        })
    }

    const handleClose = () => {
        setFormData({ name: '', price: 0, stock: 0})
        onClose && onClose()
    }

    return (<Modal
        open={open}
        onClose={handleClose}
        title={mode === 'edit' ? gt('edit') : gt('add') }
        footer={<>
            <button
                type='button'
                onClick={handleClose}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
            >
                { gt('cancel') }
            </button>
            <button
                type='submit'
                form='product-form'
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
                { gt('save') }
            </button>
        </>}
    >
        <form id='product-form' onSubmit={handleSubmit} className="space-y-4">
            <TextInputField
                label={t('name')}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
            />
            <TextInputField
                label={t('price')}
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: parseInt(e.target.value) }))}
                required
            />
            <TextInputField
                label={t('stock')}
                value={formData.stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: parseInt(e.target.value) }))}
                required
            />
        </form>
    </Modal>)
}

export default ProductModal