import React from "react";
import type { FilterDropdownProps, InputProps } from "../../Types/Layout/SearchbarTypes";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";


export const SearchbarInput: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    cancel,
    className = ''
}) => {

    const hasValue = typeof value === 'string' ? value.trim() !== '' : !!value

    return(
        <div className="md:flex-[4] md:border-r-1 md:border-b-0 md:border-r-gray-100 flex items-center
        w-full px-3 py-2 text-sm border border-gray-100 rounded-lg md:border-0 md:px-0 md:py-0 md:rounded-none">
            <input 
                type={type}
                placeholder={placeholder}
                className={`focus:outline-none w-full ${className}`}
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

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    label,
    selectedValue,
    options,
    optionId,
    id,
    setOptionId,
    onSelect,
    onClear,
    field,
    ref
}) => {

    const isOpen = optionId === id && !selectedValue;

    return(
        <div className="relative flex-[0.6] md:border-r md:border-gray-100 md:px-2 md:py-2">
            <button
                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors
                md:border-none border px-3 py-2 rounded-lg border-gray-200 md:px-0 md:py-0 md:rounded-none"
                onClick={() => setOptionId(isOpen ? null : id)}
                id={id}
            >
                <span>
                    {selectedValue || label}
                </span>
                {!selectedValue ? (
                    <IoMdArrowDropdown
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                    ) : (
                    <MdOutlineCancel
                        onClick={(e) => {
                        e.stopPropagation();
                        onClear(field);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                    />
                )}
            </button>

            {isOpen && !selectedValue &&(
                <div 
                    className="absolute md:top-full bottom-full md:bottom-none left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 md:w-auto min-w-full" 
                    ref={ref}
                >
                <ul className="flex flex-col text-sm text-gray-700">
                        {options.map((option) => (
                        <li
                            key={option.id}
                            id={String(option.id)}
                            onClick={() => onSelect(field, option.id, option.name)}
                            className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer rounded-md"
                        >
                            {option.name}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}