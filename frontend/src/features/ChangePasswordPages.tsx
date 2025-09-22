import { ChangePasswordProvider } from "../Context/ChangePasswordContext";
import ChangePassword from "../Pages/Auth/ChangePassword";

export default function ChangePasswordPages() {
  return (
    <ChangePasswordProvider>
        <ChangePassword />
    </ChangePasswordProvider>
  )
}
