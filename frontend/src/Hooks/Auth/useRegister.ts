import React, { useState, useRef } from "react";
import type {RegisterType } from '../../Types/authTypes.ts'
import { api } from '../../Utils/axiosInstance.ts'
import { useNavigate } from "react-router-dom";
import { useInputError } from "../Layout/useInputError.ts";

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

    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()
    const [showConfirm, setShowConfirm] = useState(false)
    const [showError, setShowError] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    //Sugerencias y otros
    const [suggestions, setSuggestions] = useState<string[]>([])

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


    return {
        // Estados
        form, 
        showError, 
        showConfirm, 
        container, 
        suggestions,
        message,

        // Handlers
        handleChange, 
        handleRegister, 
        setForm,
        
        getFieldsError,
        clearFieldsError,
        navigateTo
    }
}
