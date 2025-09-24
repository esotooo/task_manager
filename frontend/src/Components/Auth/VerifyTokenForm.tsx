import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../Hooks/Auth/useChangePassword";
import { FormInput } from "../Layout/ReusableInput";

export default function VerifyTokenForm() {

  const navigate = useNavigate()

  const {handleChange, handleVerifyOTP, getFieldsError, clearFieldsError, form, backToEmail} = useChangePassword()

  const navigateTo = (page: string) => {
    navigate(page)
  }

  return ( 
    <div>
        <p className="text-xs text-gray-500 mb-8">
          Hemos enviado un código de verificación al correo electrónico que registraste anteriormente. 
          Por favor, ingrésalo para continuar con el proceso de restablecimiento de contraseña.
        </p>
      <form onSubmit={handleVerifyOTP}>
          <FormInput 
            placeholder=""
            name="otp"
            value={form.otp}
            onChange={handleChange}
            error={getFieldsError('otp')}
            setError={() => clearFieldsError('otp', '')}
          />

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
