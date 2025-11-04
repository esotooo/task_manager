import React from "react";
import type { InputProps } from "../../Types/Layout/SearchbarTypes";
import { MdOutlineCancel } from "react-icons/md";

export const SearchbarInput: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    cancel,
    className = '',
}) => {

    const hasValue = typeof value === 'string' ? value.trim() !== '' : !!value

    return(
        <div className="flex-[4] border-r-1 border-b-0 border-r-gray-100 flex items-center">
            <input 
                type={type}
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                value={value}
            />
            {hasValue && 
                <MdOutlineCancel 
                    className="text-gray-400 mr-0 text-lg md:text-sm md:mr-2 cursor-pointer"
                    onClick={cancel}
                />
            }
        </div>

    )
}

export const SelectInput: React.FC<InputProps> = ({

}) => {


    return(
        <div className="relative flex-[0.6] border-r border-gray-100 px-2 py-2">
            <button
                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
            >
                <span>

                </span>
            </button>
        </div>
    )
}