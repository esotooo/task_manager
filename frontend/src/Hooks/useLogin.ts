import { useNavigate } from 'react-router-dom';
import {useAuth} from './useAuth'
import { useState } from 'react'

type FieldsErrors = { [key: string]: string };

export const useLoginForm = () => {
    const {login} = useAuth()
    const [form, setForm] = useState({
        loginInput: '',
        user_password: ''
    })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [fieldMessage, setFieldMessage] = useState<{ [key: string]: string }>({});
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await login(form)

        if(result.success){
            navigate('/main', {replace: true})
            setFieldMessage({})
            setMessage(null)
            setShowError(false)
        }else{
            setFieldMessage(result.fields || {})
            setMessage(result.message || null)
            setShowError(true)
        }
    }

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setPasswordVisible(prev => !prev)
    }

    const getFieldsError = (fieldname: string) => {
        if (!fieldMessage) return null
        const fields = fieldMessage as unknown as FieldsErrors
        return fields[fieldname] || null
    }

    const navigateTo = (page: string) => {
        navigate(page)
    }

    return{
        form,
        passwordVisible,
        message,
        showError,
        handleChange,
        handleLogin,
        togglePasswordVisibility,
        getFieldsError,
        navigateTo
    }
}