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
        try {
            const res = await api.post('/api/users/register', newUser);
            if (res.status === 201) {
                setTimeout(() => navigate('/login', { replace: true }), 3000);
                return true;
            }
            return false;
        } catch (error: any) {
            // Guardamos errores por campo en el estado
            if (error.response?.data?.fields) {
                dispatch({ type: 'show-field-error', payload: { error: error.response.data.fields } });
            }
            // Guardamos mensaje global si lo hay
            if (error.response?.data?.message) {
                dispatch({ type: 'show-message', payload: { message: error.response.data.message } });
            }
            return false;
        }
    };
    

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


