import type { SearchOptionsType } from "../Tasks/TaskTypes"

export type InputProps = {
    type: string,
    placeholder: string, 
    value: string | readonly string[] | number | undefined ;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cancel: (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
    selectedOption: SearchOptionsType,
    className: string
}

export type FilterDropdownProps = {
    label: string
    selectedValue: string
    options: {
        id: number 
        name: string 
    }[]
    optionId: number | null
    id: number
    setOptionId: (id: number | null) => void
    onSelect: (field: string, id: number | string, value: string) => void
    onClear: (field: string) => void
    field: string
    ref: React.RefObject<HTMLDivElement | null> 
    isFilterMode?: boolean
    disabled?: boolean
    className?: string
}

export type DateFilterProps = {
    label: string
    range?: { start_date?: string | null; end_date?: string | null}
    isOpen: boolean
    calendarRef?: React.RefObject<HTMLDivElement | null> 
    onToggle: () => void
    onChange: (value: [Date, Date] | Date) => void
    onNoLimit?: () => void
    onClear?: (e: React.MouseEvent) => void
    allowRange?: boolean
    allowNoLimit?: boolean
}
