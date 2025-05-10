import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import OrderTable from '../../components/OrderTable'

import type { Order } from '../../types/order'

const testData: Order[] = [
    {
      id: 1,
      customer: 'Alice',
      date: '2025-05-01',
      items: [
        { id: 1, name: 'Keyboard', price: 50.0, quantity: 2 },
        { id: 2, name: 'Mouse', price: 30.0, quantity: 1 }
      ],
      total: 130.0,
      status: 'pending',
    },
    {
      id: 2,
      customer: 'Bob',
      date: '2025-05-02',
      items: [
        { id: 3, name: 'Monitor', price: 150.0, quantity: 1 },
        { id: 4, name: 'Keyboard', price: 50.0, quantity: 1 }
      ],
      total: 200.0,
      status: 'shipped',
    }
  ]

const Orders = () => {
    const { t } = useTranslation('Orders')
    const { t: gt } = useTranslation('Global')
    const [ orders, setOrders ] = useState<Order[]>(testData)
    const [ selectedOrder, setSelectedOrder ] = useState<Order | null>(null)
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ modalType, setModalType ] = useState<'view' | 'add' | 'edit' | null>(null)

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order)
        setModalType('view')
        setIsModalOpen(true)
    }

    const handleAddOrder = () => {
        setSelectedOrder(null)
        setModalType('add')
        setIsModalOpen(true)
    }

    const handleEditOrder = (order: Order) => {
        setSelectedOrder(order)
        setModalType('edit')
        setIsModalOpen(true)
    }

    const handleDelete = (id: string | number) => {
        console.log('delete item id: ', + id)
    }

    return (<div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{ t('orders') }</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddOrder}
            >
                { gt('add') }
            </button>
        </div>
    
        <OrderTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onEdit={handleEditOrder}
            onDelete={handleDelete}
        />
    </div>)
}

export default Orders