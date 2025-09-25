import ChangePasswordForm from "../Components/Auth/ChangePasswordForm";
import EmailForm from "../Components/Auth/EmailForm";
import VerifyTokenForm from "../Components/Auth/VerifyTokenForm";
import { useChangePassword } from "../Hooks/Auth/useChangePassword";

export default function ChangePasswordFlow() {
    const {step} = useChangePassword()

    if (step === 'email') return <EmailForm />
    if (step === 'otp') return <VerifyTokenForm />
    if (step === 'change') return <ChangePasswordForm />

    return null
}
