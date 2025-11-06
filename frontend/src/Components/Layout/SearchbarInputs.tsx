import React from "react";
import type { DateFilterProps, FilterDropdownProps, InputProps } from "../../Types/Layout/SearchbarTypes";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Calendar from "react-calendar";

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
                    className="text-gray-400 mr-0 text-lg md:text-sm md:mr-2 cursor-pointer hover:text-red-500 transition-colors"
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
    ref,
    isFilterMode = true,
    disabled = false,
    className = ''
}) => {

    const isOpen = isFilterMode && optionId === id && !selectedValue;

    const handleToggle = () => {
      if (disabled) return
      if (isFilterMode && setOptionId) {
        setOptionId(isOpen ? null : id || null)
      }
    }

    return(
        <div
            className={`relative w-full md:flex-[0.6] ${
            isFilterMode ? "md:border-r md:border-gray-100 md:px-2 md:py-2" : ""
            } ${className}`}
        >
            <button
                className={`flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors
                    border md:border-none px-3 py-2 md:px-0 md:py-0 rounded-lg border-gray-200 bg-white ${
                    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                    }`}
                onClick={handleToggle}
                id={id}
                type="button"
                disabled={disabled}
            >
                <span>
                    {selectedValue || label}
                </span>
                {selectedValue ? (
                    onClear && (
                        <MdOutlineCancel
                        onClick={(e) => {
                            e.stopPropagation();
                            onClear(field);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        />
                    )
                    ) : (
                    <IoMdArrowDropdown
                        className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                        }`}
                    />
                    )}
                </button>

                {/* Menú desplegable */}
                {((isFilterMode && isOpen && !selectedValue) || (!isFilterMode && !disabled)) && (
                    <div
                    ref={ref}
                    className={`absolute bottom-full md:top-full md:bottom-auto left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-full ${
                        isFilterMode ? "md:top-full md:w-auto" : "top-full"
                    }`}
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

export const DateFilter : React.FC<DateFilterProps> = ({
    label,
    range,
    isOpen,
    calendarRef,
    onToggle,
    onChange,
    onNoLimit,
    onClear,
    allowRange = true,
    allowNoLimit = true,
}) => {
    return(
       <div className="relative md:flex-[1.6]">
            <button 
                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors border md:border-none px-3 py-2 rounded-lg border-gray-200"
                onClick={onToggle}
            >
                <p>
                    {range?.start_date && range?.end_date
                        ? `${new Date(range?.start_date).toLocaleDateString("es-ES")} - ${new Date(range?.end_date).toLocaleDateString("es-ES")}`
                        : range?.start_date
                        ? new Date(range?.start_date).toLocaleDateString("es-ES")
                        : label}
                </p>
                {range?.start_date || range?.end_date ? (
                    <MdOutlineCancel
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={onClear}
                    />
                    ) : (
                    <IoMdArrowDropdown
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                )}
            </button>
            {isOpen && (
                <div
                    ref={calendarRef}
                    className="absolute md:top-full bottom-full left-auto md:left-none md:right-0 md:w-[350px] w-auto mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 h-fit "
                >
                    <Calendar
                        selectRange={allowRange}
                        className="w-full rounded-lg border-none shadow-sm hover:shadow-md transition-shadow duration-200"
                        onChange={onChange}
                    />
                    {allowNoLimit && onNoLimit && (
                        <div className="flex justify-end mt-2 gap-2">
                            <button
                                onClick={onNoLimit}
                                className="text-xs text-gray-600 hover:text-amber-500"
                            >
                                Sin límite
                            </button>
                        </div>
                    )}
                </div>
            )}
       </div> 
    )
}