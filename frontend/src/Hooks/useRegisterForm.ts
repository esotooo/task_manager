import { useAuth } from "./useAuth"
import { useState } from "react"

export const useUserRegisterForm = () => {
    const {state, registerNewUser} = useAuth()

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        user_password: ''
    })

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const createToggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => 
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault()
            setter(prev => !prev)
        }

    const togglePasswordVisibility = createToggleVisibility(setPasswordVisible)
    const toggleConfirmPasswordVisiblity = createToggleVisibility(setconfirmPasswordVisible)

    const getFieldsError = (fieldname : string) => {
        if(!state.message || !Array.isArray(state.message)) return null

        const fieldError = state.message.find(error => (
            error.path === fieldname ||
            error.param == fieldname ||
            error.field === fieldname
        ))

        return fieldError.msg || fieldError.message || null
    } 

    const clearForm = () => {
        setForm({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            user_password: '' 
        })
        setConfirmPassword('')
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if(form.user_password !== confirmPassword){
            alert('Las contraseñas no coinciden')
            return
        }

        await registerNewUser(form)
        clearForm()
    }

    return{
        //Estados
        form,
        passwordVisible,
        confirmPasswordVisible,
        confirmPassword,
        state,

        //Handlers
        handleChange,
        handleConfirmPassword,
        handleRegister,
        toggleConfirmPasswordVisiblity,
        togglePasswordVisibility,

        //Utils
        getFieldsError
    }   
}