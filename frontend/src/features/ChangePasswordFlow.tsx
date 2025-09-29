import ChangePasswordForm from "../Components/Auth/ChangePasswordForm";
import EmailForm from "../Components/Auth/EmailForm";
import VerifyTokenForm from "../Components/Auth/VerifyTokenForm";
import { useChangePassword } from "../Hooks/Auth/useChangePassword";

export default function ChangePasswordFlow() {
    const {state} = useChangePassword()

    if (state.step === 'email') return <EmailForm />
    if (state.step === 'otp') return <VerifyTokenForm />
    if (state.step === 'change') return <ChangePasswordForm />

    return null
}
