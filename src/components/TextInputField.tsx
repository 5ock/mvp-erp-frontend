type Props = {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    type?: 'text' | 'number' | 'date';
}

const TextInputField = (props: Props) => {
    const { label, value, onChange, readOnly=false, required=false, type='text' } = props 

    return (<div>
        <label className='block text-sm mb-1'>{ label }</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            required={required}
            className='w-full p-2 border rounded bg-transparent dark:border-gray-600'
        />
    </div>)
}

export default TextInputField