import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth/useAuth";



export const ProtectedRoutes = () => {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return <Outlet />;
};
