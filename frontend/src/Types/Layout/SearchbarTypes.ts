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
}