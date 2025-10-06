import { useAuth } from "../../Hooks/Auth/useAuth"

export default function MainPage() {
    const {logout} = useAuth()

    return (
        <div>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    )
}
