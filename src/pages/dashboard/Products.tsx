import { useState } from 'react'
import { useTranslation} from 'react-i18next'

import ProductTable from '../../components/ProductTable'
import ProductModal from '../../components/ProductModal'
import PromptModal from '../../components/PromptModal'

import type { Product } from '../../types/product'

const Products = () => {
    const { t } = useTranslation('Products')
    const { t: gt } = useTranslation('Global')
    const [ products, setProducts ] = useState<Product[]>([
        { id: 1, name: 'keyboard', price: 1200, stock: 15 },
        { id: 2, name: 'Mouse', price: 800, stock: 30 }
    ])
    const [ editingProduct, setEditingProduct ] = useState<Product | null>(null)
    const [ isModalOpen, setModalOpen ] = useState<boolean>(false)
    const [ deletingProduct, setDeletingProduct ] = useState<Product | null>(null)

    const handleSave = (product: Product) => {
        if(Number(product.id) === 0) {
            const newId = Math.max(...products.map(p => Number(p.id)), 0) + 1
            setProducts([...products, { ...product, id: newId }])
        } else {
            setProducts(products.map(p => p.id === product.id ? product : p))
        }
        setModalOpen(false)
    }

    const handleDelete = (id: string | number) => {
        console.log('delete item id: ', + id)

        const target = products.find((p) => p.id === +id)
        if(target)
            setDeletingProduct(target)
    }

    const confirmDelete = () => {
        if(deletingProduct) {
            setProducts(products.filter((p) => p.id !== deletingProduct.id))
            setDeletingProduct(null)
        }
    }

    return (<div className='space-y-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{ t('products') }</h1>
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                onClick={() => {
                    setEditingProduct(null)
                    setModalOpen(true)
                }}
            >{ gt('add') }</button>
        </div>

        <ProductTable
            products={products}
            onEdit={(p) => {
                setEditingProduct(p);
                setModalOpen(true);
            }}
            onDelete={handleDelete}
        />

        <ProductModal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            product={editingProduct}
        />

        <PromptModal
            title={t('delete')+t('product')}
            open={!!deletingProduct}
            onClose={() => setDeletingProduct(null)}
            onConfirm={confirmDelete}
            prompts={<span>{ t('deletePrompt') }: { deletingProduct?.name }</span>}
        />
    </div>)
}

export default Products