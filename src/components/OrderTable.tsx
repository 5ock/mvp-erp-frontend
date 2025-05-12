import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PencilSquareIcon, TrashIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

import DataTable from './DataTable'

import type { Order } from '../types/order'

type Props = {
    orders: Order[];
    onEdit: (o: Order) => void;
    onDelete: (id: string | number) => void;
    onViewDetails: (o: Order) => void;
}

const OrderTable = (props: Props) => {
    const { t } = useTranslation('Orders')
    const { orders, onEdit, onDelete, onViewDetails } = props
    const [ sort, setSort ] = useState<{ field: string | number, direction: 'asc' | 'desc' }>({
        field: 'date',
        direction: 'asc'
    })

    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => {
            const valueA = a[sort.field as keyof Order]
            const valueB = b[sort.field as keyof Order]

            if(sort.direction === 'asc')
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
            else
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
        })
    }, [orders, sort])

    const tableTh = [
        { id: 'customer', label: t('customer'), isDataColumn: true, enableSort: true },
        { id: 'date', label: t('date'), isDataColumn: true, enableSort: true },
        { id: 'total', label: t('total'), isDataColumn: true, enableSort: true },
        { id: 'status', label: t('status'), isDataColumn: true, enableSort: true },
        { id: 'actions', label: t('actions'), isDataColumn: false, enableSort: false }
    ]

    return (<DataTable
        data={sortedOrders}
        columns={tableTh}
        sortState={sort}
        onSort={(newSort) => setSort(newSort)}
        renderRow={(o) => (<>
            <td className='p-2 border'>{o.customer}</td>
            <td className='p-2 border'>{o.date}</td>
            <td className='p-2 border'>{o.total}</td>
            <td className='p-2 border'>
                <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                        o.status === 'pending'
                            ? 'bg-yellow-500 text-white'
                            : o.status === 'shipped'
                                ? 'bg-blue-500 text-white'
                                : o.status === 'delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                    }`}
                >
                    {o.status}
                </span>
              </td>
              <td className='p-2 space-x-2 border'>
                    <button
                        onClick={() => onEdit(o)}
                        className='p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-300 rounded'
                    >
                        <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onDelete(o.id)}
                        className='p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-300 rounded'
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onViewDetails(o)}
                        className='p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-300 rounded'
                    >
                        <InformationCircleIcon className='h-5 w-5' />
                    </button>
              </td>
        </>)}
    />)
}

export default OrderTable