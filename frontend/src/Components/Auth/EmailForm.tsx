import { useChangePassword } from "../../Hooks/Auth/useChangePassword";
import { FormInput } from "../Layout/ReusableInput";
import { useNavigate } from "react-router-dom";

export default function EmailForm() {

    const navigate = useNavigate()

    const {
        handleChange,
        handleSendOTP,
        form,
        error,
        getFieldsError,
        clearFieldsError,
        showRegisterBtn
    
    } = useChangePassword()

    const navigateTo = (page: string) => {
        navigate(page)
      }
    
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
                type="email"
                value={form.email}
                onChange={handleChange}
                error={getFieldsError('email')}
                setError={() => clearFieldsError('email', '')}
            />

            <div className={`overflow-hidden transition-all duration-300 max-h-20 text-xs mt-7 text-rose-400 flex
                    ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <p>
                    {error ?? ' '}
                </p>

                {showRegisterBtn && (
                    <button className="underline font-bold text-black cursor-pointer"
                        onClick={() => navigateTo('/register')} 
                    >
                        ¿Desea registrarse?
                    </button>
                )}
            </div>
           

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
