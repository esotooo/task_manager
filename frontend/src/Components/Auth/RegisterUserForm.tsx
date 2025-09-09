import { useAuth } from "../../Hooks/useAuth";
import { useRegisterForm } from "../../Hooks/useRegisterForm"
import { FormInput, PasswordInput } from "../Layout/ReusableInput";

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
    } = useRegisterForm()

    return (
        <div className="sm:border sm:border-gray-200 sm:mt-10 mt-5 sm:px-5 sm:py-5 w-full mx-auto sm:max-w-2xl lg:max-w-3xl rounded-lg">            
        <h2 className="font-bold text-[20px] mb-4">Registrarse</h2>
            <p className="text-xs text-gray-500 mb-5">¡Uneté hoy y lleva el control de tus pendientes sin estrés!</p>
            
            <form onSubmit={handleRegister} className="space-y-4 w-full">

                <FormInput
                    placeholder='Nombre'
                    name='firstname'
                    value={form.firstname}
                    onChange={handleChange}
                    error={getFieldsError('firstname')}
                />

                <FormInput 
                    placeholder='Apellido'
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    error={getFieldsError('lastname')}    
                />

                <FormInput
                    placeholder="Usuario"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    error={getFieldsError('username')}
                />

                <FormInput 
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    error={getFieldsError('email')}
                />

                <PasswordInput
                    placeholder="Contraseña"
                    name="user_password"
                    value={form.user_password}
                    onChange={handleChange}
                    visible={passwordVisible}
                    onToggleVisibility={togglePasswordVisibility}
                    error={getFieldsError('user_password')}
                />

                <PasswordInput
                    placeholder="Verificar Contraseña"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    visible={confirmPasswordVisible}
                    onToggleVisibility={toggleConfirmPasswordVisiblity}
                    error={getFieldsError('confirm_password')}
                />

                {state.message &&
                    <p>{state.message}</p>
                }

                <button className="bg-black text-white mt-5 font-bold w-full py-2.5 rounded-lg cursor-pointer hover:bg-black/80">
                    Registrar Ahora
                </button>
            </form>

            <div className="mt-5">
                <p className="text-xs text-center text-gray-500">¿Ya tienes una cuenta?{' '}
                    <button type='submit' className="cursor-pointer underline text-black font-bold" onClick={() => navigateTo('/login')}> 
                        Inicia sesión.
                    </button> 
                </p>
            </div>

        </div>

    )
}
