import { LuEye, LuEyeClosed } from "react-icons/lu";
import type { FormInputProps, PasswordInputProps } from "../../Types/inputTypes";
import { passwordRequirements } from "../../Utils/passwordRequirements";
import { useState } from "react";

export const FormInput: React.FC<FormInputProps> = ({
    type = 'text',
    placeholder,
    name,
    value,
    onChange,
    error,
    setError,  
    className = '',
    suggestions,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setError) setError('')
        onChange(e);
    }

    const blockCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    return(
        <div className="relative pb-3">
            <input 
                type={type} 
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                onCopy={blockCopyPaste}
                onPaste={blockCopyPaste}
                onCut={blockCopyPaste}
                className={`w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
                focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black
                ${error ? 'border-b-rose-400' : ''} ${className}`}
            />
            
            <div className="flex flex-row items-center gap-3 text-xs mt-1 absolute">
                {/* Mensajes de Error */}
                <div className={`overflow-hidden transition-all duration-300 max-h-20`}>
                    <p className={`text-rose-400 italic transition-all duration-300
                        ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`
                    }>
                        {error ?? ' '}
                    </p>
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
}



export const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    name,
    value,
    onChange,
    error,
    setError,
    requirements = passwordRequirements,
    showPasswordRequirements = false,
}) => {
    const [showRequirements, setShowRequirements] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setError) setError("")
        onChange(e)
    }

    const blockCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    const handleFocus = () => {
        if(showPasswordRequirements){
            setShowRequirements(true)
        }

    } 

    const handleBlur = () =>{
       if(showPasswordRequirements){
        setShowRequirements(false)
        }
    } 

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev)
    }

    return (
        <div className="relative pb-3">
            {/* Input */}
            <div
                className={`flex w-full px-1 py-2 text-sm text-gray-500/80 border-b-3 border-b-gray-300 items-center
                focus-within:border-b-black focus-within:font-bold focus-within:bg-gray-200/30 focus-within:text-black
                ${error ? "border-b-rose-400" : ""}`}
            >
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="flex-grow outline-none bg-transparent pr-2"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onCopy={blockCopyPaste}
                    onCut={blockCopyPaste}
                    onPaste={blockCopyPaste}
                />
                <div
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer ml-2 pr-2 hover:opacity-80"
                >
                    {passwordVisible ? <LuEye /> : <LuEyeClosed />}
                </div>
            </div>

            {/* Error */}
            <div className={`overflow-hidden transition-all duration-300 max-h-20 mt-1 absolute`}>
                <p
                    className={`text-rose-400 italic transition-all duration-300 text-xs
                    ${error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                >
                    {error ?? " "}
                </p>
            </div>

            {/* Requisitos */}
            {showPasswordRequirements && requirements.length > 0 && (
            <div
                className={`
                    overflow-hidden w-full bg-gray-100 rounded-lg ease-in-out transition-all duration-300 transform
                    ${showRequirements ? "opacity-100 mt-6.5 max-h-64 p-3" : "opacity-0 mt-0 max-h-0 p-0"}
                `}
                >
                    <p className="text-sm font-semibold">Requisitos:</p>
                    <ul className="space-y-1 text-xs">
                        {requirements.map((req, idx) => {
                        const passed = req.test.test(value);
                        return (
                            <li
                            key={idx}
                            className={`flex items-center gap-2 ${
                                passed ? "text-green-600" : "text-gray-500"
                            }`}
                            >
                                <span>{passed ? "✅" : "❌"}</span>
                                    {req.label}
                            </li>
                        )
                    })}
                </ul>
            </div>
            )}
        </div>
    )
}
