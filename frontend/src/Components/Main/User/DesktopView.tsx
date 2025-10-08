import { useState } from "react";
import { IoMdPerson, IoMdColorPalette, IoMdLock, IoMdLogOut} from "react-icons/io";
import { SiTask } from "react-icons/si";
import { useAuth } from "../../../Hooks/Auth/useAuth";


export default function DesktopView() {
    const [activeSection, setActiveSection] = useState("account");
    const {logout} = useAuth()

  return (
    <div className="hidden w-full h-full md:flex ">
      {/* Sidebar */}
      <aside className="w-60 h-screen border-r border-gray-200 p-5 flex justify-between flex-col">
        <div>
        <div className="flex items-center text-3xl mb-5">
            <SiTask />
            Task<span className="font-bold">Flow</span>
        </div>
        <h2 className="text-lg font-semibold mb-4">Ajustes de Cuenta</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setActiveSection("account")}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
              activeSection === "account" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
            }`}
          >
            <IoMdPerson /> Perfil
          </li>
          <li
            onClick={() => setActiveSection("password")}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
              activeSection === "password" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
            }`}
          >
            <IoMdLock /> Seguridad
          </li>
          <li
            onClick={() => setActiveSection("appearance")}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
              activeSection === "appearance" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
            }`}
          >
            <IoMdColorPalette /> Preferencias
          </li>
 
        </ul>
        </div>

        <button 
            type="button"
            onClick={logout} 
            className="w-full border-1 border-gray-100 rounded-lg text-rose-500 font-bold p-4 cursor-pointer flex justify-center items-center gap-2"
        >
            <IoMdLogOut/>
            Cerrar Sesión
        </button>

      </aside>


      {/* Contenido dinámico */}
      <main className="flex-1 p-8">
        {activeSection === "account" && <AccountSettings />}
        {activeSection === "appearance" && <AppearanceSettings />}
        {activeSection === "password" && <PasswordSettings />}
      </main>
    </div>
  );
}

function AccountSettings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Cuenta</h3>
      <p className="text-sm text-gray-500 mb-2">Actualiza tu información personal:</p>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Apariencia</h3>
      <p className="text-sm text-gray-500 mb-2">Selecciona tema y colores:</p>
      {/* Opciones de tema claro/oscuro, color primario, etc */}
    </div>
  );
}

function PasswordSettings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Seguridad</h3>
      <p className="text-sm text-gray-500 mb-2">Cambia tu contraseña:</p>
      {/* Formulario para cambio de contraseña */}
    </div>
  );
}
