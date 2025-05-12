import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import DataTable from './DataTable'
import type { Product } from '../types/product'

type Props = {
    products: Product[];
    onEdit: (p: Product) => void;
    onDelete: (id: string | number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
    const { t } = useTranslation('Products')
    const [ sort, setSort ] = useState<{ field: string | number, direction: 'asc' | 'desc' }>({
        field: 'name',
        direction: 'asc'
    })

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            const aValue = a[sort.field as keyof Product]
            const bValue = b[sort.field as keyof Product]

            if(typeof aValue === 'number' && typeof bValue === 'number')
                return sort.direction === 'asc' ? aValue - bValue : bValue - aValue

            if(typeof aValue === 'string' && typeof bValue === 'string')
                return sort.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue)

            return 0
        })
    }, [products, sort])

    const tableTh = [
        { id: 'name', label: t('name'), enableSort: true, isDataColumn: true },
        { id: 'price', label: t('price'), enableSort: true, isDataColumn: true },
        { id: 'stock', label: t('stock'), enableSort: true, isDataColumn: true },
        { id: 'actions', label: t('actions'), enableSort: false, isDataColumn: false },
    ]

    return (<DataTable
        data={sortedProducts}
        columns={tableTh}
        sortState={sort}
        onSort={(newSort) => setSort(newSort)}
        renderRow={(p) => (<>
            <td className='p-2 border'>{p.name}</td>
            <td className='p-2 border'>{p.price}</td>
            <td className='p-2 border'>{p.stock}</td>
            <td className='p-2 border space-x-2'>
                <button
                    onClick={() => onEdit(p)}
                    className='p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-300 rounded'
                >
                    <PencilSquareIcon className='h-5 w-5' />
                </button>
                <button
                    onClick={() => onDelete(p.id)}
                    className='p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-300 rounded'
                >
                    <TrashIcon className='h-5 w-5' />
                </button>
            </td>
        </>)}
    />)
}

export default ProductTable