import { useChangePassword } from "../../Hooks/Auth/useChangePassword";
import { FormInput } from "../Layout/ReusableInput";

export default function VerifyTokenForm() {

  const {handleChange, handleVerifyOTP, getFieldsError, clearFieldsError, form, backToEmail, error,
    minutes, seconds, showButton, resendOTP, showCounter
  } = useChangePassword()

  return ( 
    <div>
        <p className="text-xs text-gray-500 mb-8">
          Hemos enviado un código de verificación al correo electrónico que registraste anteriormente. 
          Por favor, ingrésalo para continuar con el proceso de restablecimiento de contraseña.
        </p>

      <form onSubmit={handleVerifyOTP}>
          <FormInput 
            placeholder=""
            type="number"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            error={getFieldsError('otp')}
            setError={() => clearFieldsError('otp', '')}
          />

          <div className={`overflow-hidden transition-all duration-300 max-h-10 text-xs mt-7 text-rose-400 italic
                    ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <p>
                    {error ?? ' '}
                </p>
          </div>

          <div className="flex justify-center flex-col">
            {showCounter && (
              <p className="text-xs text-center mt-2"> Expira en: {' '}
                <span className="font-bold">{minutes}:{seconds.toString().padStart(2, "0")}</span>
              </p>
            )}


            {showButton && (
              <button className="text-xs underline font-bold cursor-pointer" onClick={resendOTP}>Reenviar código</button>
            )}
          </div>
          
       

          <button 
              type="submit" 
              className="cursor-pointer bg-black text-white mt-8 font-bold
              w-full py-3 text-sm rounded-md hover:bg-black/80"   
          >
              Verificar Código
          </button>     
      </form>
        <button 
              type="button" 
              className="cursor-pointer bg-gray-800 text-white mt-1.5 font-bold
              w-full py-3 text-sm rounded-md hover:bg-gray-800/80"   
              onClick={backToEmail}
          >
              Regresar
          </button>   
    </div>
 
  )
}
