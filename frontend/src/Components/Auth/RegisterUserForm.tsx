import { useRegisterForm } from "../../Hooks/useRegister"
import { FormInput, PasswordInput } from "../Layout/ReusableInput";
import StateWindows from "../../Components/Auth/StateWindows";


export default function RegisterUserForm() {

    const { 
        form, 
        passwordVisible, 
        confirmPasswordVisible,
        passwordRequirements,
        requirements,
        suggestions,
        showConfirm,
        showError,
        message,
        container,
        setForm,
        handleRegister, 
        handleChange, 
        toggleConfirmPasswordVisibility,
        togglePasswordVisibility,
        showRequirements,
        hideRequirements,
        getFieldsError,
        navigateTo
    } = useRegisterForm()


    return (
        <div className="sm:border sm:border-gray-200 sm:mt-10 mt-5 sm:px-5 sm:py-5 w-full mx-auto sm:max-w-2xl lg:max-w-3xl rounded-lg">            
            <h2 className="font-bold text-[20px] mb-4">Registrarse</h2>
            <div className="relative">
            <StateWindows
                showConfirm={showConfirm}
                showError={showError}
                message={message}
                container={container}
            />       
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
                        suggestions={suggestions.map((suggestion, index) => (
                            <button 
                                key={index}
                                type="button"
                                onClick={() => setForm({...form, username: suggestion})}
                                className="text-sm bg-gray-200/80 px-2 rounded-md font-bold"
                            >
                                {suggestion}
                            </button>
                        ))}
                    />

                    <FormInput 
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={getFieldsError('email')}
                    />

                    <div>
                        <PasswordInput
                            placeholder="Contraseña"
                            name="user_password"
                            value={form.user_password}
                            onChange={handleChange}
                            visible={passwordVisible}
                            onToggleVisibility={togglePasswordVisibility}
                            error={getFieldsError('user_password')}
                            onFocus={showRequirements}
                            onBlur={hideRequirements}
                        />

                        <div className={`
                            overflow-hidden w-full bg-gray-100 rounded-lg ease-in-out transition-all duration-300 transform 
                            ${requirements ? "opacity-100 mt-2 max-h-64 p-3" : "opacity-0 mt-0 max-h-0 p-0"}
                        `}>
                            <p className="text-sm font-semibold">Requisitos:</p>
                            <ul className="space-y-1 text-xs">
                                {passwordRequirements.map((req, idx) => {
                                    const passed = req.test.test(form.user_password)
                                    return(
                                        <li
                                            key={idx}
                                            className={`flex items-center gap-2 ${passed ? 'text-green-600' : 'text-gray-500'}`}
                                        >
                                            <span>{passed ? '✅' : '❌' }</span>
                                            {req.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <PasswordInput
                        placeholder="Verificar Contraseña"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        visible={confirmPasswordVisible}
                        onToggleVisibility={toggleConfirmPasswordVisibility}
                        error={getFieldsError('confirm_password')}
                    />

                    <button className="bg-black text-white font-bold w-full py-2.5 mt-5 rounded-lg cursor-pointer hover:bg-black/80">
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
        </div>

    )
}
