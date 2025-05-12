export type Option = {
    value: string | number;
    label: string;
}

type Props = {
    value: string | number | '';
    onChange: (value: string | number) => void;
    options: Option[];
    disabled?: boolean;
    placeholder?: string;
}

const Selector = (props: Props) => {
    const { value, onChange, options, disabled=false, placeholder='' } = props

    return (<select
        className='w-full p-2 border rounded bg-transparent dark:border-gray-600'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
    >
        { placeholder && <option value=''>{ placeholder }</option>}
        { options.map(opt => (
            <option key={opt.value} value={opt.value}>
                { opt.label }
            </option>
        ))}
    </select>)
}

export default Selector