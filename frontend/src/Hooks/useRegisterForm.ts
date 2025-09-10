import { useAuth } from "./useAuth"
import { useState } from "react"

type FieldsErrors = {
    [key: string]: string;
  };

export const useRegisterForm = () => {
    const {state, registerNewUser} = useAuth()

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        user_password: '',
        confirm_password: ''
    })

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false)
    const [requirements, setRequirements] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const createToggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => 
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault()
            setter(prev => !prev)
        }

    const togglePasswordVisibility = createToggleVisibility(setPasswordVisible)
    const toggleConfirmPasswordVisiblity = createToggleVisibility(setconfirmPasswordVisible)

    

    const getFieldsError = (fieldname: string) => {
        if (!state.fields) return null;
      
        // casteamos primero a unknown, luego a FieldsErrors
        const fields = state.fields as unknown as FieldsErrors;
      
        return fields[fieldname] || null;
      };
    
    const clearForm = () => {
        setForm({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            user_password: '',
            confirm_password: ''
        })
    }

    const passwordRequirements = [
        {test: /.{8,}/, label: 'Mínimo 8 caracteres.'},
        {test: /[A-Z]/, label: 'Al menos una mayúscula.'},
        {test: /[a-z]/, label: 'Al menos una minúscula.'},
        {test: /\d/, label: 'Al menos un número.'},
        { test: /[^A-Za-z0-9]/, label: "Al menos un carácter especial" }
    ]

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const success = await registerNewUser(form)


        if(success){
            clearForm()
        }
    }

    const showRequirements = () => {
        setRequirements(true)
    }

    const hideRequirements = () => {
        setRequirements(false)
    }

    return{
        //Estados
        form,
        passwordVisible,
        confirmPasswordVisible,
        state,
        passwordRequirements,
        requirements,

        //Handlers
        handleChange,
        handleRegister,
        toggleConfirmPasswordVisiblity,
        togglePasswordVisibility,
        showRequirements,
        hideRequirements,

        //Utils
        getFieldsError,
    }   
}