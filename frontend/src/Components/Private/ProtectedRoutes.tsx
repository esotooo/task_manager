import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";

type ProtectedRoutesProps = {
    children: React.JSX.Element
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
};
