import { useChangePassword } from "../../Hooks/Auth/useChangePassword";
import { PasswordInput } from "../Layout/ReusableInput";

export default function ChangePasswordForm() {

    const {handleChangePassword, state, handleChange,
        getFieldsError, clearFieldsError
    } = useChangePassword()
        
    return (
        <div>
            <p className="text-xs text-gray-500 mb-8">
                Ingresa tu nueva contraseña para completar el proceso de restablecimiento de tu perfil. 
                Asegúrate de elegir una contraseña segura que solo tú conozcas.
            </p>
            <form onSubmit={handleChangePassword}>
                <PasswordInput 
                    placeholder="Contraseña nueva"
                    name="user_password"
                    value={state.form.user_password}
                    onChange={handleChange}
                    error={getFieldsError('user_password')}
                    setError={() => clearFieldsError('user_password', '')}
                    showPasswordRequirements
                />

                

                <button 
                    className="cursor-pointer bg-black text-white mt-8 font-bold
                    w-full py-3 text-sm rounded-md hover:bg-black/80" 
                    type="submit"
                >
                    Cambiar contraseña
                </button>
            </form>
        </div>
    )
}
