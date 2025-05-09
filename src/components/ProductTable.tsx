import { useState, useMemo } from 'react'
import { useTranslation} from 'react-i18next'

import DataTable from './DataTable'
import type { Product } from '../types/product'

type Props = {
    products: Product[];
    onEdit: (p: Product) => void;
    onDelete: (id: string | number) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
    const { t } = useTranslation('Products')
    const [ sort, setSort ] = useState<{ field: string | number, direction: 'asc' | 'desc' }>({ field: 'name', direction: 'desc' })

    const sortedProducts = () => {}

    const tableTh = [
        { id: 'name', label: t('name'), enableSort: true, isDataColumn: true },
        { id: 'price', label: t('price'), enableSort: true, isDataColumn: true },
        { id: 'stock', label: t('stock'), enableSort: true, isDataColumn: true },
        { id: 'actions', label: t('actions'), enableSort: false, isDataColumn: false },
    ]

    return (<DataTable
        data={products}
        columns={tableTh}
        sortState={sort}
        // onSort={(newSort) => setSort(null)}
        renderRow={(p) => (
          <>
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">{p.price}</td>
            <td className="p-2 border">{p.stock}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </>
        )}
    />)
}

export default ProductTable