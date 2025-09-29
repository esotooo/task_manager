import { useLoginForm } from '../../Hooks/Auth/useLogin';
import { currentYear } from "../../Utils/helpers";
import { FormInput, PasswordInput } from "../Layout/ReusableInput";

export default function LoginForm() {


    const {
        state,
        handleChange,
        handleLogin,
        navigateTo,
        getFieldsError,
        clearFieldsError,
    } = useLoginForm()
    

  return (
    <section className="bg-white order-2 px-20 pt-25 flex flex-col justify-between">
        <div>
            <h1 className="text-3xl ">Task <span className="-ml-1.5 font-extrabold">Flow</span></h1>
                <div className="mt-20">
                    <h2 className="font-semibold text-2xl">¡Bienvenido de nuevo!</h2>
                    <p className="text-xs text-gray-500">¿No tienes una cuenta? {''}
                           <button className="cursor-pointer text-black underline font-bold" onClick={() => navigateTo('/register')}> 
                                Crea una cuenta ahora.
                            </button> 
                    </p>
                    <p className="text-xs text-gray-500">¡ES GRATIS! y toma menos de un minuto. </p>
                </div>

                <form onSubmit={handleLogin} className="mt-7 space-y-5">

                    <FormInput 
                        placeholder="Usuario o Correo Electrónico"
                        name="loginInput"
                        value={state.form.loginInput}
                        onChange={handleChange}
                        error={getFieldsError('loginInput')}
                        setError={() => clearFieldsError('loginInput', '')}
                    />

                    <PasswordInput 
                        placeholder="Contraseña"
                        name="user_password"
                        value={state.form.user_password}
                        onChange={handleChange}
                        error={getFieldsError('user_password')}
                        setError={() => clearFieldsError('user_password', '')}
                        />

                    <div className="h-1">
                        {state.message && 
                            <p className="text-xs text-rose-400 italic">{state.message}</p>
                        }
                    </div>

                    <button type='submit' className="mt-8 bg-black text-white font-bold w-full py-3 text-sm rounded-md cursor-pointer hover:bg-black/80">
                        Iniciar Sesión
                    </button>
                </form>

            <div className="mt-5">
                <p className="text-xs text-center text-gray-500">¿Olvidaste tu contraseña?{' '}
                    <button className="cursor-pointer underline text-black font-bold" onClick={() => navigateTo('/change-password')}> 
                        Haz click aquí.
                    </button> 
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
