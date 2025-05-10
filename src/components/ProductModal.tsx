import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'

import type { Product } from '../types/product'

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (p: Product) => void;
    product: Product | null;
}

const ProductModal =({ open, onClose, onSave, product }: Props) => {
    const { t } = useTranslation('Products')
    const { t: gt } = useTranslation('Global')

    const [ name, setName ] = useState<string>('')
    const [ price, setPrice ] = useState<number>(0)
    const [ stock, setStock ] = useState<number>(0)

    useEffect(() => {
        if(product) {
            const { name, price, stock } = product
            setName(name)
            setPrice(price)
            setStock(stock)
        } else {
            setName('')
            setPrice(0)
            setStock(0)
        }
    }, [product])

    if(!open)
        return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            id: product?.id ?? 0,
            name,
            price,
            stock 
        })
    }

    return (<Modal
        open={open}
        onClose={onClose}
        title={ product ? t('edit') : t('add') }
        footer={<>
            <button
                type='button'
                onClick={onClose}
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
            <div>
                <label className='block text-sm'>{ t('name') }</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 border rounded bg-transparent dark:border-gray-600'
                    required
                />
            </div>
            <div>
                <label className='block text-sm'>{ t('price') }</label>
                <input
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className='w-full p-2 border rounded bg-transparent dark:border-gray-600'
                    required
                />
            </div>
            <div>
                <label className='block text-sm'>{ t('stock') }</label>
                <input
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                    className='w-full p-2 border rounded bg-transparent dark:border-gray-600'
                    required
                />
            </div>
        </form>
    </Modal>)
}

export default ProductModal