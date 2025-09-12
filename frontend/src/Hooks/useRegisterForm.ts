import { useAuth } from "./useAuth";
import React, { useState, useEffect, useRef } from "react";
import lottie from 'lottie-web';


type FieldsErrors = { [key: string]: string };

const passwordRequirements = [
    { test: /.{8,}/, label: 'Mínimo 8 caracteres.' },
    { test: /[A-Z]/, label: 'Al menos una mayúscula.' },
    { test: /[a-z]/, label: 'Al menos una minúscula.' },
    { test: /\d/, label: 'Al menos un número.' },
    { test: /[^A-Za-z0-9]/, label: 'Al menos un carácter especial.' }
]

export const useRegisterForm = () => {
    const { state, registerNewUser, fieldMessage, showConfirm, showError, searchExistingUsernames, suggestions} = useAuth()

    const [form, setForm] = useState({
        firstname: '',
        lastname: '', 
        username: '', 
        email: '', 
        user_password: '', 
        confirm_password: ''
    })

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [requirements, setRequirements] = useState(false)

    const container = useRef<HTMLDivElement>(null)
    const animInstance = useRef<any>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => 
            ({ ...prev, [name]: value })
        )
    }

    const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
        (e: React.MouseEvent) => { e.preventDefault(); setter(prev => !prev) }

    const togglePasswordVisibility = toggleVisibility(setPasswordVisible)
    const toggleConfirmPasswordVisibility = toggleVisibility(setConfirmPasswordVisible)

    const getFieldsError = (fieldname: string) => {
        if (!fieldMessage) return null
        const fields = fieldMessage as unknown as FieldsErrors
        return fields[fieldname] || null
    }

    const clearForm = () => setForm({ 
        firstname: '', 
        lastname: '',
        username: '', 
        email: '', 
        user_password: '', 
        confirm_password: '' 
    })

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        await searchExistingUsernames(form.username)
        const success = await registerNewUser(form)
        if (success) clearForm()
    }

    // Lottie animation hook unificado
    useEffect(() => {
        if ((showConfirm || showError) && container.current) {
            animInstance.current = lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: showConfirm ? '/gif/Success.json' : '/gif/error.json'
            })
        }

        return () => {
            if (animInstance.current) {
                animInstance.current.destroy();
                animInstance.current = null;
            }
        };
    }, [showConfirm, showError])
    

    return {
        // Estados
        form, 
        passwordVisible, 
        confirmPasswordVisible,
        state, 
        requirements, 
        showError, 
        showConfirm, 
        container, 
        passwordRequirements,
        suggestions,

        // Handlers
        handleChange, 
        handleRegister, 
        togglePasswordVisibility, 
        toggleConfirmPasswordVisibility,
        showRequirements: () => setRequirements(true),
        hideRequirements: () => setRequirements(false),
        setForm,

        // Utils
        getFieldsError,
    }
}
