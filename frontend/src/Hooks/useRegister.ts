import React, { useState, useRef } from "react";
import type {RegisterType } from '../Types/authTypes.ts'
import { api } from '../Utils/axiosInstance.ts'
import { useNavigate } from "react-router-dom";

const passwordRequirements = [
    { test: /.{8,}/, label: 'Mínimo 8 caracteres.' },
    { test: /[A-Z]/, label: 'Al menos una mayúscula.' },
    { test: /[a-z]/, label: 'Al menos una minúscula.' },
    { test: /\d/, label: 'Al menos un número.' },
    { test: /[^A-Za-z0-9]/, label: 'Al menos un carácter especial.' }
]
type FieldsErrors = { [key: string]: string };



export const useRegisterForm = () => {
    // --- ESTADOS ---
    //Formulario
    const [form, setForm] = useState({
        firstname: '',
        lastname: '', 
        username: '', 
        email: '', 
        user_password: '', 
        confirm_password: ''
    })

    //Mensajes / errores
    const [fieldMessage, setFieldMessage] = useState<{ [key: string]: string }>({});
    const [showConfirm, setShowConfirm] = useState(false)
    const [showError, setShowError] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    //Sugerencias y otros
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [requirements, setRequirements] = useState(false)

    const navigate = useNavigate()


    //Animaciones
    const container = useRef<HTMLDivElement>(null)

    
    // --- FUNCIONES: API ---
    const searchExistingUsernames = async(username : string) => {
        try {
            const res = await api.get(`/api/users/search-username?username=${username}`)
            if (res.status === 200) {
                setSuggestions([])
            }
            return true
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 409) {
                    setSuggestions(error.response.data.data.suggestions)
                    return false
                }
            } 
            setSuggestions([])
            return false
        }
    }
    
    const registerNewUser = async (newUser: RegisterType) => {
        try {
            const res = await api.post('/api/users/register', newUser);
        
            if (res.status === 201) {
                setShowConfirm(true)
                setMessage(res.data.message)

                setTimeout(() => {
                    setMessage('')
                    setShowConfirm(false)
                    setFieldMessage({})
                    navigate('/login')
                }, 5000)

                return true
            }
            return false

        } catch (error: any) {
            if(error.response){
                if(error.response.data.fields){
                    setFieldMessage(error.response.data.fields)
                }if(error.response.data.message){
                    setShowError(true)
                    setMessage(error.response.data.message)
                    setTimeout(() => {
                        setShowError(false)
                        setMessage('')
                    }, 5000);
                }
            }else{
                setShowError(true)
                setMessage('Error en la conexión con el servidor.')
                setTimeout(() => {
                    setShowError(false)
                    setMessage('')
                }, 5000);
            }
            return false
        }
    }


    const navigateTo = (page: string) => {
        navigate(page)
    }

    //--- FUNCIONES: FORMULARIO ----
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => 
            ({ ...prev, [name]: value })
        )
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

    // --- FUNCIONES: UI ----
    const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
        (e: React.MouseEvent) => { e.preventDefault(); setter(prev => !prev) }

    const togglePasswordVisibility = toggleVisibility(setPasswordVisible)
    const toggleConfirmPasswordVisibility = toggleVisibility(setConfirmPasswordVisible)


    
    // --- HELPERS ---
    const getFieldsError = (fieldname: string) => {
        if (!fieldMessage) return null
        const fields = fieldMessage as unknown as FieldsErrors
        return fields[fieldname] || null
    }

    return {
        // Estados
        form, 
        passwordVisible, 
        confirmPasswordVisible,
        requirements, 
        showError, 
        showConfirm, 
        container, 
        passwordRequirements,
        suggestions,
        message,

        // Handlers
        handleChange, 
        handleRegister, 
        togglePasswordVisibility, 
        toggleConfirmPasswordVisibility,
        showRequirements: () => setRequirements(true),
        hideRequirements: () => setRequirements(false),
        setForm,

        getFieldsError,
        navigateTo
    }
}
