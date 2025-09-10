import {createContext, useReducer, useState, type ReactNode} from 'react'
import {AuthReducer, type AuthActions, initialAuthState, type AuthState}from '../Reducers/auth-reducer.ts'
import { api } from '../Utils/axiosInstance.ts'
import {useNavigate } from "react-router-dom"
import type { LoginType, RegisterType } from '../Types/authTypes.ts'



type AuthContextProps = {
    state: AuthState,
    dispatch: React.Dispatch<AuthActions>,
    login: (body: LoginType) => Promise<void>,
    token: string,
    setToken: (token: string) => void,
    registerNewUser: (body: RegisterType) => Promise<boolean>,
    navigateTo: (path: string) => (e: React.MouseEvent) => void,
    fieldMessage: string,
    showError: boolean,
    showConfirm: boolean,
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
    const [token, setToken] = useState('')
    const [fieldMessage, setFieldMessage] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate();

    const handleError = (error:any) => {
        dispatch({type: 'show-message', payload: {message: error.response.data.message || 'Error en el servidor.'}});
        setTimeout(() => {
            dispatch({type: 'close-message', payload: {message: ''}})
        }, 3000);
    }

    const registerErrors = (msg : string) => {
        dispatch({type: 'show-message', payload: {message: msg}})
        setShowError(true)
        setTimeout(() => {
            dispatch({ type: 'close-message', payload: { message: '' } })
            setShowError(false)
        }, 5000);
    }

    const login = async (user: LoginType) => {
        try{
            const res = await api.post('/api/users/login', user)
            if(res.status === 200){
                dispatch({type: 'login', payload: {login: res.data.data}});
                navigate('/main', {replace: true, state: {login: res.data.data}}); 
                setToken(res.data.token)           
            }
        }
        catch(error){
            handleError(error)
        }
    }

    const registerNewUser = async (newUser: RegisterType) => {
        try {
            const res = await api.post('/api/users/register', newUser);
        
            if (res.status === 201) {
                setShowConfirm(true)
                dispatch({ type: 'show-message', payload: { message: 'Usuario registrado exitosamente.' } })
        
                setTimeout(() => {
                    navigate('/login', { replace: true })
                    dispatch({ type: 'close-message', payload: { message: '' } })
                    setShowConfirm(false)
                }, 5000)

                return true
            }
        
            return false

        } catch (error: any) {
            if(error.response){
                if(error.response?.data?.fields){
                    setFieldMessage(error.response.data.fields)
                    setTimeout(() => {
                        setFieldMessage('')
                    }, 5000);
                } else if(error.response?.data?.message){
                    registerErrors(error.response.data.message)
                }
            }else{
                const msg = 'Error en el servidor.'
                registerErrors(msg)
            }

            return false

            }
      }
      

    const navigateTo = (path: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        navigate(path)
    }

    return(
        <AuthContext.Provider 
            value={{state, dispatch, login, setToken, token, registerNewUser, navigateTo, fieldMessage, showConfirm, showError}}    
        >
            {children}
        </AuthContext.Provider>
    )
}


