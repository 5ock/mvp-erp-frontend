import Modal from './Modal'
import { useTranslation } from 'react-i18next'

type Props = {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void;
    prompts: string | React.ReactNode;
}

const PromptModal = (props: Props) => {
    const { open, title, onClose, onConfirm, prompts } = props
    const { t } = useTranslation('Global')

    return (<Modal
        open={open}
        onClose={onClose}
        title={title}
        footer={
          <>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              {t('cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {t('confirm')}
            </button>
          </>
        }
    >
        <p className="">
            { prompts }
        </p>
    </Modal>)
}

export default PromptModal