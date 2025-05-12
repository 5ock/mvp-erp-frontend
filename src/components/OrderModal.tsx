import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

import Modal from './Modal'
import TextInputField from './TextInputField'
import Selector from './Selector'
import type { Order, OrderItem } from '../types/order'

// fake data
import products from '../data/product.json'

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (order: Order) => void;
    selectedOrder: Order | null;
    mode: 'add' | 'edit' | 'view' | null;
}

const OrderModal = (props: Props) => {
    const { open, onClose, onSave, selectedOrder, mode } = props
    const { t } = useTranslation('Orders')
    const { t: gt } = useTranslation('Global')

    const [ formData, setFormData ] = useState<Omit<Order, 'id' | 'total'>>({
        customer: '',
        orderNumber: -1,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        items: [],
    })

    const productOptions = products.map(p => ({
        value: p.id,
        label: p.name,
        price: p.price,
        stock: p.stock
    }))

    useEffect(() => {
        if(selectedOrder) {
          const { customer, orderNumber, date, status, items } = selectedOrder
          setFormData({ customer, orderNumber, date, status, items })
        } else {
            setFormData({
                customer: '',
                orderNumber: -1,
                date: new Date().toISOString().split('T')[0],
                status: 'pending',
                items: [],
            })
        }
    }, [selectedOrder, mode])

    const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
        const updated = [...formData.items]
        updated[index] = { ...updated[index], [field]: field === 'quantity' || field === 'price' ? Number(value) : value }
        setFormData((prev) => ({ ...prev, items: updated }))
      }
    
      const addItem = () => {
        if(formData.items.length >= products.length)
            return

        const availableProduct = productOptions.find(p => !formData.items.some(item => item.id === p.value))
        if(!availableProduct)
            return

        setFormData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    id: availableProduct.value,
                    name: availableProduct.label,
                    price: availableProduct.price,
                    quantity: 1,
                },
            ]
        }))
      }
    
      const removeItem = (index: number) => {
        const updated = [...formData.items]
        updated.splice(index, 1)
        setFormData((prev) => ({ ...prev, items: updated }))
      }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const total = formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        onSave({
            id: selectedOrder?.id ?? 0,
            ...formData,
            total,
        })
    }

    const handleClose = () => {
        setFormData({
            customer: '',
            orderNumber: -1,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
            items: [],
        })
        onClose && onClose()
    }

    if(!open)
        return null

    const selectedProductIds = formData.items.map(item => item.id)

    const getAvailableOptions = (currentId: number) => {
        return productOptions.filter(
            (p) => p.value === currentId || !selectedProductIds.includes(p.value)
        )
    }

    return (<Modal
        open={open}
        onClose={handleClose}
        title={mode === 'view'
          ? gt('detail')
          : mode === 'edit'
            ? gt('edit')
            : gt('add')
        }
        footer={mode === 'view'
            ? (<button
                type='button'
                onClick={handleClose}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
            >{ gt('close') }</button>)
            : (<>
                <button
                    type='button'
                    onClick={handleClose}
                    className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
                >
                    {gt('cancel')}
                </button>
                <button
                    type='submit'
                    form='order-form'
                    className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                    {gt('save')}
                </button>
            </>)
        }
    >
        <form
            id='order-form'
            onSubmit={handleSubmit}
            className='space-y-4'
        >
            { mode === 'view' && 
                (<TextInputField
                    label={t('orderNumber')}
                    value={formData.orderNumber}
                    onChange={() => {}}
                    readOnly={true}
                />)
            }
            <TextInputField
                label={t('customer')}
                value={formData.customer}
                onChange={(e) => setFormData((prev) => ({...prev, customer: e.target.value}))}
                readOnly={mode === 'view'}
                required
            />
            <TextInputField
                label={t('date')}
                type='date'
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({...prev, date: e.target.value}))}
                readOnly={mode === 'view'}
                required
            />
            <div>
                <label className='block text-sm mb-2'>{ t('status') }:</label>
                <div className='flex flex-wrap gap-4 justify-between'>
                    {(['pending', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map((status) => (
                        <label key={status} className='flex items-center space-x-2'>
                            <input
                                type='radio'
                                name='status'
                                value={status}
                                checked={formData.status === status}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                    ...prev,
                                    status: e.target.value as Order['status'],
                                    }))
                                }
                                readOnly={mode === 'view'}
                                disabled={mode === 'view'}
                            />
                            <span>{ t(status) }</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label className='block text-sm mb-2'>{t('items')}:</label>
                <div className='space-y-2'>
                    {formData.items.length > 0 && (
                        <div className={`grid grid-cols-3 gap-2 font-semibold text-sm text-gray-400 dark:text-gray-300 mb-1 ${mode !== 'view' ? 'pr-[32px]' : ''}`}>
                            <span>{ t('product') }</span>
                            <span>{ t('price') }</span>
                            <span>{ t('quantity') }</span>
                        </div>
                    )}
                    { formData.items.map((item, index) => {
                        const product = productOptions.find(p => p.value === item.id)
                        const maxQuantity = product ? product.stock : 0

                        if(mode === 'view') {
                            return (
                                <div key={index} className='grid grid-cols-3 gap-2 w-full'>
                                    <span>{productOptions.find(p => String(p.value) === String(item.id))!.label}</span>
                                    <span>{item.price}</span>
                                    <span>{item.quantity}</span>
                            </div>)
                        }

                        return (<div key={item.id} className='flex gap-2 mb-2'>
                            <div className='grid grid-cols-3 gap-2 mb-2'>
                                <Selector
                                    value={item.id}
                                    onChange={(val) => {
                                        const product = productOptions.find(p => String(p.value) === String(val))
                                        if (product) {
                                            const updated = [...formData.items]
                                            updated[index] = {
                                                ...updated[index],
                                                id: product.value,
                                                name: product.label,
                                                price: product.price,
                                                quantity: 1
                                            }
                                            setFormData((prev) => ({ ...prev, items: updated }))
                                        }
                                    }}
                                    options={getAvailableOptions(item.id)}
                                />
                                <input
                                    type='number'
                                    value={item.price}
                                    className='p-2 border rounded bg-transparent dark:border-gray-600'
                                    placeholder={t('price')}
                                    readOnly
                                />
                                <input
                                    type='number'
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    className='p-2 border rounded bg-transparent dark:border-gray-600'
                                    placeholder={t('quantity')}
                                    max={maxQuantity}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="flex self-center items-center text-red-400 hover:text-red-600 text-sm"
                                title={gt('delete')}
                            >
                                <TrashIcon className='w-6 h-6' />
                            </button>
                        </div>
                        )
                    })}
                </div>
                { mode !== 'view' && (
                    <button
                        type="button"
                        onClick={addItem}
                        className={`mt-2 text-sm px-2 py-1 rounded inline-flex items-center gap-1 ${
                            formData.items.length >= products.length
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'text-blue-600 hover:underline'
                        }`}
                        disabled={formData.items.length >= products.length}
                        title={formData.items.length >= products.length ? t('noMoreProducts') : ''}
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span>{gt('add')}</span>
                    </button>
                )}
                {formData.items.length > 0 && (
                    <div className="text-right font-semibold mt-4">
                        {t('total')}: {formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                    </div>
                )}

            </div>
        </form>
    </Modal>)
}

export default OrderModal
