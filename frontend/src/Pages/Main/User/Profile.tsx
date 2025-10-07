import { useAuth } from "../../../Hooks/Auth/useAuth"

export default function Profile() {
  const {logout} = useAuth()
  return (
    <div>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  )
}
