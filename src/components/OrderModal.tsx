import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import type { Order, OrderItem } from '../types/order'

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
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        items: [],
    })

    useEffect(() => {
        if(selectedOrder) {
          const { customer, date, status, items } = selectedOrder
          setFormData({ customer, date, status, items })
        } else {
            setFormData({
              customer: '',
              date: new Date().toISOString().split('T')[0],
              status: 'pending',
              items: [],
            })
        }
    }, [selectedOrder, mode])

    if(!open)
        return null

    return (<Modal
        open={open}
        onClose={onClose}
        title={mode === 'view'
          ? gt('detail')
          : mode === 'edit'
            ? gt('edit')
            : gt('add')
        }
        footer={mode === 'view'
            ? (<button
                type='button'
                onClick={onClose}
                className='px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500'
            >{ gt('close') }</button>)
            : (<>
                <button
                  type='button'
                  onClick={onClose}
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
        <div>asdf</div>
    </Modal>)
}

export default OrderModal
