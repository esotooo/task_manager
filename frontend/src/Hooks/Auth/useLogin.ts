import { useNavigate } from 'react-router-dom';
import {useAuth} from './useAuth'
import { useReducer } from 'react'
import { useInputError } from '../Layout/useInputError';
import { LoginReducer, initialState} from '../../Reducers/login-reducer';


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
            dispatch({type: 'CLEAR_ERROR'})
            dispatch({type: 'CLEAR_FIELDS'})

        }else{
            setFieldMessage(result.fields || {})
            dispatch({type: 'SET_ERROR', message: result.message || null})
        }
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
    }
}