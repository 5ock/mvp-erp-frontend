import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

type Column = {
    id: string | number;
    label: string;
    enableSort?: boolean;
    isDataColumn?: boolean;
    width?: string;
}

type SortState = {
    field: string | number;
    direction: 'asc' | 'desc';
}

type Props<T> = {
    data: T[];
    columns: Column[];
    onSort?: (sort: SortState) => void;
    renderRow: (item: T) => React.ReactNode;
    sortState?: SortState;
}

const DataTable = <T extends { id: number | string }>({
    data,
    columns,
    renderRow,
    onSort,
    sortState
}: Props<T>) => {
    const autoWidthColumns = columns.filter(col => !col.width).length
    const defaultWidth = autoWidthColumns > 0 ? `${100 / autoWidthColumns}%` : 'auto'

    const dataColumns = columns.filter(col => col.isDataColumn)
    const handleSort = (field: string | number) => {
        if(!onSort || !dataColumns.some(col => col.id === field))
            return

        const direction = sortState?.field === field && sortState.direction === 'asc'
            ? 'desc'
            : 'asc'

        onSort({ field, direction })
    }

    return (<table
        className='w-full border border-gray-300 dark:border-gray-600 text-sm'
    >
        <thead className='bg-gray-100 dark:bg-gray-700'>
            <tr>
                { columns.map((col) => (
                    <th
                        key={String(col.id)}
                        className={`p-2 border curosr-pointer select-none ${col.enableSort && 'cursor-pointer'}`}
                        style={{ 
                            width: col.width || defaultWidth,
                            minWidth: '50px'
                        }}
                    >
                        <div
                            className='flex items-center space-x-1'
                            onClick={() => col.enableSort && handleSort(col.id)}
                        >
                            <span>{ col.label }</span>
                            { col.enableSort 
                                && sortState?.field === col.id
                                && (<>
                                    { sortState.direction === 'asc'
                                        ? (<ArrowUpIcon className='h-4 w-4' />)
                                        : (<ArrowDownIcon className='h-4 w-4' />)
                                    }
                                </>)
                            }
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            { data.map((item) => (
                <tr key={item.id}
                    className='even:bg-gray-50 dark:even:bg-gray-800'
                >
                    { renderRow(item) }
                </tr>
            ))}
        </tbody>
    </table>)
}

export default DataTable