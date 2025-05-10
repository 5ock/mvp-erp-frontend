import { useEffect } from 'react'

type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal = (props: Props) => {
    const { open, onClose, title, children, footer } = props

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape')
                onClose()
        }
    
        if(open)
          document.addEventListener('keydown', handleKeyDown)
    
        return () => document.removeEventListener('keydown', handleKeyDown)
      }, [open, onClose])

    if(!open)
        return null
    
    return (<div
        className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'
        onClick={onClose}
    >
        <div
            className='bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md'
            onClick={(e) => e.stopPropagation()}
        >
            { title
                && (<h2 className='text-xl font-bold mb-4'>{ title }</h2>)
            }
            <div className='space-y-4'>{ children }</div>
            { footer
                && (<div className='mt-6 flex justify-end space-x-2'>{ footer }</div>)
            }
        </div>

    </div>)
}

export default Modal