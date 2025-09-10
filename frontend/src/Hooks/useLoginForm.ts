import {useAuth} from './useAuth'
import { useState } from 'react'
import type { LoginType } from "../Types/authTypes";


export const useLoginForm = () => {
    const {login} = useAuth()
    const [form, setForm] = useState({
        loginInput: '',
        password: ''
    })
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {loginInput, password} = form

        const body:LoginType = {user_password: password}
        if(form.loginInput.includes('@')){
            body.email = loginInput
        }else{
            body.username = loginInput
        }
        await login(body)
    }

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setPasswordVisible(prev => !prev)
    }
    
    return{
        form,
        passwordVisible,
        handleChange,
        handleLogin,
        togglePasswordVisibility
    }
}