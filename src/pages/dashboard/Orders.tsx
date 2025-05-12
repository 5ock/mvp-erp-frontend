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

    const handleModalClose = () => {
        setIsModalOpen(false)
        setModalType(null)
        setSelectedOrder(null)
    }

    const handleDelete = (id: string | number) => {
        console.log('delete item id: ', + id)
    }

    const handleSaveOrder = (o: Order) => {}

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
            open={isModalOpen}
            onClose={handleModalClose}
            mode={modalType}
            selectedOrder={selectedOrder}
            onSave={handleSaveOrder}
        />

        {/* <PromptModal
            title={t('delete') + t('product')}
            open={!!deletingProduct}
            onClose={() => setDeletingProduct(null)}
            onConfirm={confirmDelete}
            prompts={<span>{ t('deletePrompt') }: { deletingProduct?.name }</span>}
        /> */}
    </div>)
}

export default Orders