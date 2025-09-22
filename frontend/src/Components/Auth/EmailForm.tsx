import { useChangePassword } from "../../Hooks/useChangePassword";
import { FormInput } from "../Layout/ReusableInput";

export default function EmailForm() {

    const {
        handleChange,
        handleSendOTP,
        form,
        message,
        error,
        
    } = useChangePassword()
    
  return (
    <div>
        <p className="text-xs text-gray-500 mb-8">
            Ingresa tu correo electrónico registrado. Te enviaremos un código de verificación para 
            restablecer tu contraseña.
        </p>

        <form onSubmit={handleSendOTP}>
            <FormInput 
                placeholder="Correo electrónico"
                name="email"
                value={form.email}
                onChange={handleChange}
            />

            {message && <p>{message}</p>}   
            {error && <p>{error}</p>} 

            <button 
                type="submit" 
                className="cursor-pointer bg-black text-white mt-8 font-bold
                w-full py-3 text-sm rounded-md hover:bg-black/80"   
            >
                Enviar Código
            </button>
        </form>

    </div>
  )
}
