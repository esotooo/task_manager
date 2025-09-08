import { useState } from "react"
import { useAuth } from '../../Hooks/useAuth'
import { currentYear } from "../../Utils/helpers";
import type { LoginType } from "../../Types/authTypes";


export default function LoginForm() {

    const {state, login} = useAuth()
    const [form, setForm] = useState({
        loginInput: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {loginInput, password} = form

        const body:LoginType = {user_password: password}
        if(form.loginInput.includes('@')){
            body.email = loginInput
        }else{
            body.username = loginInput
        }
        await login(body)
    }

  return (
    <section className="bg-white order-2 px-20 pt-25 flex flex-col justify-between">
        <div>
            <h1 className="text-3xl ">Task <span className="-ml-1.5 font-extrabold">Flow</span></h1>
                <div className="mt-20">
                    <h2 className="font-semibold text-2xl">¡Bienvenido de nuevo!</h2>
                    <p className="text-xs text-gray-500">¿No tienes una cuenta? 
                        <span className="font-bold cursor-pointer text-black underline"> Crea una cuenta ahora.</span>
                    </p>
                    <p className="text-xs text-gray-500">¡ES GRATIS! y toma menos de un minuto. </p>
                </div>

                <form onSubmit={handleLogin} className="mt-7">

                    <input 
                        type="text" 
                        placeholder="Usuario o Correo Electrónico" 
                        name="loginInput"
                        value={form.loginInput}
                        onChange={handleChange}
                        className="w-full mb-5 px-1 py-2 text-sm outline-none text-gray-500/80 border-b-3 border-b-gray-300
                        focus:border-b-black focus:font-bold focus:bg-gray-200/30 focus:text-black"
                    />

                    <div>
                        <input 
                            type="text"
                            placeholder="Contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mb-2 px-1 py-2 text-sm outline-none text-gray-500/80 border-b-3 border-b-gray-300 
                            focus:border-b-black focus:font-bold focus:bg-gray-200/30 focus:text-black"
                            />
                    </div>

                    <div className="h-5">
                        {state.message && 
                            <p className="text-xs text-rose-400 italic">{`* ${state.message}`}</p>
                        }
                    </div>


                <button className="mt-5 bg-black text-white font-bold w-full py-3 text-sm rounded-md cursor-pointer hover:bg-black/80">
                    Iniciar Sesión
                </button>
            </form>

            <div className="mt-5">
                <p className="text-xs text-center text-gray-500">¿Olvidaste tu contraseña? 
                    <span className="text-black font-bold cursor-pointer underline"> Haz click aquí.</span>
                </p>
            </div>
        </div>
 
        {/** FOOTER SOLO PARA TELEFONO Y TABLET */}
        <p className="text-sm text-black mb-5 text-center block lg:hidden">
            {`© ${currentYear} TaskFlow. Todos los derechos reservados.`}
        </p>

    </section>
  )
}
