import {createContext, useReducer, useState, type ReactNode, useEffect} from 'react'
import {AuthReducer, AuthActions, initialAuthState, AuthState}from '../Reducers/auth-reducer.ts'
import { api } from '../Utils/axiosInstance.ts'
import {useNavigate } from "react-router-dom"
import type { LoginType } from '../Types/authTypes.ts'


type AuthContextProps = {
    state: AuthState,
    dispatch: React.Dispatch<AuthActions>,
    login: (body: LoginType) => Promise<void>,
    token: string,
    setToken: (token: string | undefined) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
    const [token, setToken] = useState<user | null>()

    const navigate = useNavigate();

    const handleError = (error:any) => {
        dispatch({type: 'show-message', payload: {message: error.response.data.message}});
        setTimeout(() => {
            dispatch({type: 'close-message', payload: {message: ''}})
        }, 3000);
    }

    const login = async (body: LoginType) => {
        try{
            const res = await api.post('/api/users/login', body)
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

    useEffect(() => {
        if(!token){
            navigate('/login', {replace: true})
        }
    }, [token, navigate])


    return(
        <AuthContext.Provider 
            value={{state, dispatch, login, setToken, token}}    
        >
            {children}
        </AuthContext.Provider>
    )
}


