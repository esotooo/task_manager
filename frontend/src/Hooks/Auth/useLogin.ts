import { useNavigate } from 'react-router-dom';
import {useAuth} from './useAuth'
import { useState } from 'react'
import { useInputError } from '../Layout/useInputError';


export const useLoginForm = () => {
    const {login}  = useAuth()
    const [form, setForm] = useState({
        loginInput: '',
        user_password: ''
    })
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)

    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()

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

    const navigateTo = (page: string) => {
        navigate(page)
    }

    return{
        form,
        message,
        showError,
        handleChange,
        handleLogin,
        getFieldsError,
        clearFieldsError,
        navigateTo
    }
}