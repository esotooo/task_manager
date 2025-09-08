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
    registerNewUser: (body: RegisterType) => Promise<void>,
    navigateTo: (path: string) => (e: React.MouseEvent) => void,
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
    const [token, setToken] = useState('')

    const navigate = useNavigate();

    const handleError = (error:any) => {
        dispatch({type: 'show-message', payload: {message: error.response.data.message}});
        setTimeout(() => {
            dispatch({type: 'close-message', payload: {message: ''}})
        }, 3000);
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
        try{
            const res = await api.post('/api/users/register', newUser)
            if(res.status === 201){
                dispatch({type: 'register', payload: {register: res.data.data}});
                dispatch({type: 'show-message', payload: {message: res.data.message}})
                navigate('/login', {replace: true})
            }
        }catch(error){
            handleError(error)
        }
    }

    const navigateTo = (path: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        navigate(path)
    }

    return(
        <AuthContext.Provider 
            value={{state, dispatch, login, setToken, token, registerNewUser, navigateTo}}    
        >
            {children}
        </AuthContext.Provider>
    )
}


