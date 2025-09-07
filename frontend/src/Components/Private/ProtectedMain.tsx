import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

type ProtectedMainProps = {
    children: React.JSX.Element
}

export const ProtectedMain = ({ children }: ProtectedMainProps) => {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
};
