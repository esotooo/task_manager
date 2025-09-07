import { useState } from "react"
import { useAuth } from "../Hooks/useAuth"
import {useNavigate } from "react-router-dom"


export default function LoginPage() {

    const {state, login} = useAuth()
    const [loginInput, setLoginInput] = useState('')
    const [password, setPassword] = useState('')


    const getLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInput(e.target.value)
    }

    const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }   
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body:any = {user_password: password}
        if(loginInput.includes('@')){
            body.email = loginInput
        }else{
            body.username = loginInput
        }
        await login(body)
    }



    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                        type="text" 
                        id="email_username" 
                        placeholder="Ingrese su usuario o correo electrónico" 
                        value={loginInput}
                        onChange={getLoginInput}
                        className=""
                    />
                </div>

                <div>
                    <input 
                        type="password"
                        id="text"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={getPassword}
                        className=""
                    />
                </div>

                <button>
                    Iniciar Sesión
                </button>
            </form>
            {state.message && <p>{state.message}</p>}
        </div>
    )
}
