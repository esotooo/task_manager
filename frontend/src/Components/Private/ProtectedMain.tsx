import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";

type ProtectedMainProps = {
    children: React.JSX.Element
}

export const ProtectedMain = ({ children }: ProtectedMainProps) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
};
