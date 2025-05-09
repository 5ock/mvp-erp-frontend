import { useState } from 'react'
import { useTranslation} from 'react-i18next'


import ProductTable from '../../components/ProductTable'

import type { Product } from '../../types/product'

const Products = () => {
    const { t } = useTranslation('Products')
    const [ products, setProducts ] = useState<Product[]>([
        { id: 1, name: 'keyboard', price: 1200, stock: 15 },
        { id: 2, name: 'Mouse', price: 800, stock: 30 }
    ])
    const [ editingProduct, setEditingProduct ] = useState<Product | null>(null)
    const [ isModalOpen, setModalOpen ] = useState<boolean>(false)

    const handleSave = (product: Product) => {}

    const handleDelete = (id: string | number) => {}

    return (<div className='space-y-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{ t('products') }</h1>
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                onClick={() => {}}
            >Add Product</button>

        </div>

        <ProductTable
            products={products}
            onEdit={() => {}}
            onDelete={() => {}}
        />
    </div>)
}

export default Products