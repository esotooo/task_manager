import { useRegisterForm } from "../../Hooks/Auth/useRegister"
import { FormInput, PasswordInput } from "../Layout/ReusableInput";
import StateWindows from "../../Components/Auth/StateWindows";

export default function RegisterUserForm() {

    const { 
        state,
        container,
        handleRegister, 
        handleChange, 
        getFieldsError,
        clearFieldsError,
        navigateTo,
        dispatch
    } = useRegisterForm()


    return (
        <div className="sm:border sm:border-gray-200 sm:mt-10 mt-5 sm:px-5 sm:py-5 w-full mx-auto sm:max-w-2xl lg:max-w-3xl rounded-lg">            
            <h2 className="font-bold text-[20px] mb-4">Registrarse</h2>
            <div className="relative">
            <StateWindows
                showConfirm={state.showConfirm}
                showError={state.showError}
                message={state.message}
                container={container}
            />       
         <p className="text-xs text-gray-500 mb-5">¡Uneté hoy y lleva el control de tus pendientes sin estrés!</p>
                
                <form onSubmit={handleRegister} className="space-y-4 w-full">

                    <FormInput
                        placeholder='Nombre'
                        name='firstname'
                        value={state.form.firstname}
                        onChange={handleChange}
                        error={getFieldsError('firstname')}
                        setError={() => clearFieldsError('firstname', '')}
                    />

                    <FormInput 
                        placeholder='Apellido'
                        name="lastname"
                        value={state.form.lastname}
                        onChange={handleChange}
                        error={getFieldsError('lastname')} 
                        setError={() => clearFieldsError('lastname', '')}   
                    />

                    <FormInput
                        placeholder="Usuario"
                        name="username"
                        value={state.form.username}
                        onChange={handleChange}
                        error={getFieldsError('username')}
                        suggestions={state.suggestions.map((s, idx) => (
                            <button 
                                key={idx}
                                type="button"
                                onClick={() =>  dispatch({type: 'SET_FIELD', field: 'username', value: s})}
                                className="text-sm bg-gray-200/80 px-2 rounded-md font-bold"
                            >
                                {s}
                            </button>
                        ))}
                        setError={() => clearFieldsError('username', '')}
                    />

                    <FormInput 
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={state.form.email}
                        onChange={handleChange}
                        error={getFieldsError('email')}
                        setError={() => clearFieldsError('email', '')}
                    />

                    <PasswordInput
                        placeholder="Contraseña"
                        name="user_password"
                        value={state.form.user_password}
                        onChange={handleChange}
                        error={getFieldsError('user_password')}
                        setError={() => clearFieldsError('user_password', '')}
                        showPasswordRequirements
                    />

                    <PasswordInput
                        placeholder="Verificar Contraseña"
                        name="confirm_password"
                        value={state.form.confirm_password}
                        onChange={handleChange}
                        error={getFieldsError('confirm_password')}
                        setError={() => clearFieldsError('confirm_password', '')}
                    />

                    <button className="bg-black text-white font-bold w-full py-2.5 mt-5 rounded-lg cursor-pointer hover:bg-black/80"
                        type="submit"
                    >
                        Registrar Ahora
                    </button>
                </form>


                <div className="mt-5">
                    <p className="text-xs text-center text-gray-500">¿Ya tienes una cuenta?{' '}
                        <button type='button' className="cursor-pointer underline text-black font-bold" onClick={() => navigateTo('/login')}> 
                            Inicia sesión.
                        </button> 
                    </p>
                </div>
            </div>
        </div>

    )
}
