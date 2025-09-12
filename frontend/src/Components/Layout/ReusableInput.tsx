import { LuEye, LuEyeClosed } from "react-icons/lu";
import type { FormInputProps, PasswordInputProps } from "../../Types/inputTypes";

export const FormInput: React.FC<FormInputProps> = ({
    type = 'text',
    placeholder,
    name,
    value,
    onChange,
    error,
    className = '',
    suggestions,
}) => (
    <div>
        <input 
            type={type} 
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
            focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black
            ${error ? 'border-b-rose-400' : ''} ${className}`}
        />
        
        <div className="flex flex-row items-center gap-3 text-xs mt-1">
            {/* Mensajes de Error */}
            <div
                className={`overflow-hidden ease-in-out transition-all transform duration-300
                    ${error ? "opacity-100 h-auto" : "opacity-0 h-0"}`}
            >
                {error && <p className="text-rose-400">{error}</p>}
            </div>

            {/* Sugerencias */}
            {suggestions && suggestions.length > 0 && (
                <div className="flex items-center gap-2">
                    <p>Sugerencias:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions}
                    </div>
                </div>
            )}
        </div>
    </div>

)

export const PasswordInput : React.FC<PasswordInputProps> = ({
    placeholder,
    name, 
    value, 
    onChange, 
    error,
    visible,
    onToggleVisibility,
    onBlur,
    onFocus,
    
}) => (
    <div>
        <div className={`flex w-full px-1 py-2 text-sm text-gray-500/80 border-b-3 border-b-gray-300 items-center
            focus-within:border-b-black focus-within:font-bold focus-within:bg-gray-200/30 focus-within:text-black
            ${error ? 'border-b-rose-400' : ''}`}>
            <input 
                type={visible ? 'text' : 'password'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="flex-grow outline-none bg-transparent pr-2"
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <div 
                onClick={onToggleVisibility} 
                className="cursor-pointer ml-2 pr-2 hover:opacity-80"
            >
                {visible ? <LuEye /> : <LuEyeClosed />}
            </div>
        </div>
        <div className={`overflow-hidden ease-in-out transition-all transform duration-300
            ${error ? 'opacity-100 h-5' : 'opacity-0 h-0'}`}
        >
            {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
        </div>
</div>
)