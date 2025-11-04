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


export type SelectProps = {
    type: string, 
    
}