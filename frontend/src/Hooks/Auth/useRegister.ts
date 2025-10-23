import React, {useRef, useReducer } from "react";
import type {RegisterType } from '../../Types/Auth/authTypes.ts'
import { api } from '../../Utils/axiosInstance.ts'
import { useNavigate } from "react-router-dom";
import { useInputError } from "../Layout/useInputError.ts";
import { initialState, RegisterReducer } from "../../Reducers/register-reducer.ts";

export const useRegisterForm = () => {
    // --- ESTADOS ---
    // useReducer para manejo de logica en formulario para ingresar usuarios
    const [state, dispatch] = useReducer(RegisterReducer, initialState);

    // custom hook para manejo de errores por campo
    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()

    // navigate para manejar cambio de paginas
    const navigate = useNavigate()


    //Animaciones
    const container = useRef<HTMLDivElement>(null)
    
    // --- FUNCIONES: API ---
    // Funcion para buscar que el usuario ingresado no exista en la DB y mostrar sugerencias
    const searchExistingUsernames = async(username : string) => {
        try {
            const res = await api.get(`/api/users/search-username?username=${username}`)
            if (res.status === 200) {
                dispatch({type: 'SET_SUGGESTIONS', suggestions: []})
            }
            return true
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 409) {
                    dispatch({type: 'SET_SUGGESTIONS', suggestions: error.response.data.data.suggestions})
                    return false
                }
            } 
            dispatch({type: 'SET_SUGGESTIONS', suggestions: []})
            return false
        }
    }

    // Funcion para register usuarios nuevos
    const registerNewUser = async (newUser: RegisterType) => {
        try {
            const res = await api.post('/api/users/register', newUser);
        
            if (res.status === 201) {
                dispatch({type: 'SET_CONFIRM', message: res.data.message})

                setTimeout(() => {
                    dispatch({type: 'SET_CONFIRM', message: ''})
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
                } 
                if(error.response.data.message){
                    dispatch({ type: "SET_ERROR", message: error.response.data.message })
                    setTimeout(() => dispatch({ type: "SET_ERROR", message: null }), 5000)
                }
                return false;
            }else{
                dispatch({type: 'SET_ERROR', message: 'Error en la conexión con el servidor'})
                setTimeout(() => dispatch({ type: "SET_ERROR", message: null }), 5000)
            }
            return false
        }
    }

    // Funcion para navegar entre paginas
    const navigateTo = (page: string) => {
        navigate(page)
    }

    //--- FUNCIONES: FORMULARIO ----
    // Funcion para detectar cambios en input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_FIELD', field: e.target.name, value: e.target.value})
    }

    // Funcion para limpiar el formulario
    const clearForm = () => dispatch({ type: "CLEAR_FORM" });

    // Funcion para registrar usuario por medio de un formulario
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        await searchExistingUsernames(state.form.username)
        const success = await registerNewUser(state.form)
        if (success) clearForm()
    }

    return {
        // Estados
        state,
        container, 

        // Handlers
        dispatch,
        handleChange, 
        handleRegister, 

        getFieldsError,
        clearFieldsError,
        navigateTo
    }
}
