import { useAuth } from "../../Hooks/useAuth";
import { useUserRegisterForm } from "../../Hooks/useRegisterForm"
import { LuEye, LuEyeClosed } from "react-icons/lu";


export default function RegisterUserForm() {
    const {navigateTo} = useAuth()

    const { 
        state,
        form, 
        passwordVisible, 
        confirmPasswordVisible,
        confirmPassword,
        handleRegister, 
        handleChange, 
        toggleConfirmPasswordVisiblity, 
        togglePasswordVisibility,
        handleConfirmPassword,
        getFieldsError
    } = useUserRegisterForm()

    return (
        <div className="sm:border sm:border-gray-200 sm:mt-10 mt-5 sm:px-5 sm:py-5 w-full mx-auto sm:max-w-2xl lg:max-w-3xl rounded-lg">            
        <h2 className="font-bold text-[20px] mb-4">Registrarse</h2>
            <p className="text-xs text-gray-500 mb-5">¡Uneté hoy y lleva el control de tus pendientes sin estrés!</p>
            
            <form onSubmit={handleRegister} className="space-y-4 w-full">

                <div>
                    <input 
                        type="text" 
                        placeholder="Nombre"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        className="w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
                        focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black"
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Apellido"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        className="w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
                        focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black"
                    /> 
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Usuario"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
                        focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black"
                    />
                </div>

                <div>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full text-sm outline-none px-1 py-2 text-gray-500/80 border-b-3 border-b-gray-300
                        focus-within:border-b-black focus:font-bold focus-within:bg-gray-200/30 focus-within:text-black"
                    />
                </div>


                <div 
                className="flex w-full px-1 py-2 text-sm text-gray-500/80 border-b-3 border-b-gray-300 items-center
                    focus-within:border-b-black focus-within:font-bold focus-within:bg-gray-200/30 focus-within:text-black"
                >
                    <input 
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Contraseña"
                        name="user_password"
                        value={form.user_password}
                        onChange={handleChange}
                        className="flex-grow outline-none bg-transparent pr-2"
                    />
                    <div 
                        onClick={togglePasswordVisibility} 
                        className="cursor-pointer ml-2 pr-2 hover:opacity-80"
                    >
                        {passwordVisible ? <LuEye /> : <LuEyeClosed />}
                    </div>
                </div>

                <div 
                    className="flex w-full px-1 py-2 text-sm text-gray-500/80 border-b-3 border-b-gray-300 items-center 
                    focus-within:border-b-black focus-within:font-bold  focus-within:bg-gray-200/30 focus-within:text-black"
                >
                    <input 
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        placeholder="Verificar contraseña"
                        name="confirm_password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        className="flex-grow outline-none bg-transparent pr-2"
                    />
                    <div 
                        onClick={toggleConfirmPasswordVisiblity} 
                        className="cursor-pointer ml-2 pr-2 hover:opacity-80"
                    >
                        {confirmPasswordVisible ? <LuEye /> : <LuEyeClosed />}
                    </div>
                </div>

                {state.message &&
                    <p>{state.message}</p>
                }

                <button className="bg-black text-white mt-5 font-bold w-full py-2.5 rounded-lg cursor-pointer hover:bg-black/80">
                    Registrar Ahora
                </button>
            </form>

            <div className="mt-5">
                <p className="text-xs text-center text-gray-500">¿Ya tienes una cuenta?{' '}
                    <button type='submit' className="cursor-pointer underline text-black font-bold" onClick={navigateTo('/login')}> 
                        Inicia sesión.
                    </button> 
                </p>
            </div>

        </div>

    )
}
