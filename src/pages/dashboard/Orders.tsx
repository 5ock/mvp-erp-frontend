import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import OrderTable from '../../components/OrderTable'
import OrderModal from '../../components/OrderModal'
import PromptModal from '../../components/PromptModal'

import type { Order } from '../../types/order'

const testData: Order[] = [
    {
      id: 1,
      orderNumber: 1,
      customer: 'Alice',
      date: '2025-05-01',
      items: [
        { id: 1, name: 'Keyboard', price: 1200, quantity: 2 },
        { id: 2, name: 'Mouse', price: 800, quantity: 1 }
      ],
      total: 3200,
      status: 'pending',
    },
    {
      id: 2,
      customer: 'Bob',
      orderNumber: 2,
      date: '2025-05-02',
      items: [
        { id: 1, name: 'Keyboard', price: 1200, quantity: 1 },
        { id: 2, name: 'Mouse', price: 800, quantity: 1 }
      ],
      total: 2000,
      status: 'shipped',
    }
]

const Orders = () => {
    const { t } = useTranslation('Orders')
    const { t: gt } = useTranslation('Global')
    const [ orders, setOrders ] = useState<Order[]>(testData)
    const [ selectedOrder, setSelectedOrder ] = useState<Order | null>(null)
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const [ modalType, setModalType ] = useState<'view' | 'add' | 'edit' | null>(null)
    const [ deletingOrder, setDeletingOrder ] = useState<Order | null>(null)

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order)
        setModalType('view')
        setModalOpen(true)
    }

    const handleAddOrder = () => {
        setSelectedOrder(null)
        setModalType('add')
        setModalOpen(true)
    }

    const handleEditOrder = (order: Order) => {
        setSelectedOrder(order)
        setModalType('edit')
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalType(null)
        setSelectedOrder(null)
        setModalOpen(false)
    }

    const handleDelete = (id: string | number) => {
        console.log('delete item id: ', + id)
        
        const target = orders.find((o) => o.id === id)
        if(target)
            setDeletingOrder(target)
    }

    const confirmDelete = () => {
        if(deletingOrder) {
            setOrders(orders.filter((o) => o.id !== deletingOrder.id))
            setDeletingOrder(null)
        }

    }

    const handleSaveOrder = (order: Order) => {
        console.log(order)

        if(Number(order.id) === 0) {
            const newId = Math.max(...orders.map(o => Number(o.id)), 0) + 1
            const newOrderNumber = Math.max(...orders.map(o => Number(o.orderNumber), 0)) + 1
            setOrders([...orders, { ...order, id: newId, orderNumber: newOrderNumber }])
        } else {
            setOrders(orders.map(o => o.id === order.id ? order : o))
        }
        setModalOpen(false)
    }

    return (<div className='space-y-6'>
        <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold">{ t('orders') }</h1>
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
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

        <OrderModal
            open={modalOpen}
            onClose={handleModalClose}
            mode={modalType}
            selectedOrder={selectedOrder}
            onSave={handleSaveOrder}
        />

        <PromptModal
            title={gt('delete') + t('order')}
            open={!!deletingOrder}
            onClose={() => setDeletingOrder(null)}
            onConfirm={confirmDelete}
            prompts={<span>{ gt('deletePrompt') + t('orderNumber') }: { deletingOrder?.orderNumber }</span>}
        />
    </div>)
}

export default Orders