import { useNavigate } from 'react-router-dom';
import {useAuth} from './useAuth'
import { useReducer } from 'react'
import { useInputError } from '../Layout/useInputError';
import { LoginReducer, initialState} from '../../Reducers/login-reducer';
import { api } from '../../Utils/axiosInstance.ts'

export const useLoginForm = () => {

    // Variable para guardar token y datos en un estado global
    const { login }  = useAuth() 

    // useReducer para manejo de acciones dentro del formulario de login
    const [ state, dispatch ] = useReducer(LoginReducer, initialState)

    // custom hook para manejo de errores por campo
    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()

    const navigate = useNavigate()

    //--- FUNCIONES: FORMULARIO ----
    // Funcion para detectar cambios en input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_FIELD', field: e.target.name, value: e.target.value})
    }

    // Funcion para iniciar sesión por medio de un formulario
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await login(state.form)

        if(result.success){
            navigate('/main', {replace: true})
            setFieldMessage({})
            dispatch({type: 'SET_MESSAGE', message: '', status: null})
            dispatch({type: 'CLEAR_FIELDS'})

        }else{
            setFieldMessage(result.fields || {})
            if(result.message === "Debes verificar tu cuenta antes de iniciar sesión."){
                dispatch({type: 'SET_MESSAGE', message: result.message || null, status: 'error'})
                dispatch({type: 'SHOW_BUTTON'})
            }else{
                dispatch({type: 'SET_MESSAGE', message: result.message || null, status: 'error'})
                dispatch({type: 'HIDE_BUTTON'})
            }
        }
    }

    const resendVerificationEmail = async (email : string) => {
        try{
            const res = await api.get(`/api/users/resend-verification?email=${email}`)
            if(res.status === 200){
                dispatch({type: 'SET_MESSAGE', message: res.data.message, status: 'success'})
                dispatch({type: 'HIDE_BUTTON'})
            }
        }catch(error : any){
            dispatch({type: 'SET_MESSAGE', message: error.data.message, status: 'error'})
            dispatch({type: 'HIDE_BUTTON'})
        }
    }

    const handleResendButton = async ( e: React.FormEvent ) => {
        e.preventDefault()
        await resendVerificationEmail(state.form.email)
    }



    const navigateTo = (page: string) => {
        navigate(page)
    }

    return{
        state,
        handleChange,
        handleLogin,
        getFieldsError,
        clearFieldsError,
        navigateTo,
        handleResendButton,
    }
}