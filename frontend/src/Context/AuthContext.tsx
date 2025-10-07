import { createContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../Utils/axiosInstance.ts';
import type { InformationReceivedType, LoginType } from '../Types/authTypes.ts';

type AuthContextProps = {
  user: InformationReceivedType | null
  login: (body: LoginType) => Promise<loginResult>
  logout: () => void
  loading: boolean
}

type loginResult = {
    success: boolean;
    fields?: Record<string, string> 
    message?: string 
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<InformationReceivedType | null>(null)
    const [loading, setLoading] = useState(true)

    const login = async (credentials: LoginType): Promise<loginResult> => {
        try {
            const res = await api.post('/api/users/login', credentials, {withCredentials: true})
            if (res.status === 200) {
                setUser(res.data)
                return {success: true}
            }
            return {success: false}
        } catch(error : any) {
            if(error.response){
                if(error.response.data.fields){
                    return {success: false, fields: error.response.data.fields}
                }if(error.response.data.message){
                    return {success: false, message: error.response.data.message}
                }
            }
            return {success: false, message: 'Error en la conexión con el servidor.'}
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await api.get('/api/users/active-session', {withCredentials: true})
                if (res.data.success){
                    setUser(res.data)
                }
            }catch{
                setUser(null)
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, []) 


    const logout = async  () => {
        try{
            await api.post('/api/users/logout', {}, { withCredentials: true })
        }catch{
            console.error('Error cerrando sesión') //Modificar esto
        }finally{
            setUser(null)
        }
    }


    return (
        <AuthContext.Provider value={{
            user, 
            login, 
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
