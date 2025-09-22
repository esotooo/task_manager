import { useContext } from "react";
import { ChangePasswordContext } from "../Context/ChangePasswordContext";

export const useChangePassword = () => {
    const context = useContext(ChangePasswordContext)

    if(!context){
        throw new Error('useChangePassword debe estar dentro de ChangePasswordProvider.')
    }

    return context
}