import { useAuth } from "../../../Hooks/Auth/useAuth"
import { IoMdLogOut } from "react-icons/io";
import { MdEdit, MdDarkMode, MdLock } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileView() {
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto py-8 px-6 md:hidden">

      {/* --- Perfil --- */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Perfil</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {/* Aquí iría la imagen real del usuario */}
            <img 
              src={"https://via.placeholder.com/80"} 
              alt="Foto de perfil" 
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user?.data.firstname} {user?.data.lastname}</h3>
            <p className="text-gray-500">{user?.data.email}</p>
            <button className="mt-2 text-sm text-blue-600 flex items-center gap-1 hover:underline">
              <MdEdit /> Editar perfil
            </button>
          </div>
        </div>
      </section>

        {/* --- Seguridad --- */}
        <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Seguridad</h2>
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MdLock className="text-xl" />
                <p className="font-medium">Cambiar contraseña</p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">Editar</button>
            </div>
        </section>

      {/* --- Preferencias --- */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Preferencias</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdDarkMode className="text-xl" />
            <p className="font-medium">Modo oscuro</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </section>



      {/* --- Cerrar sesión --- */}
      <section className="bg-white p-6 rounded-xl shadow">
        <button
            type="button"
            className="w-full bg-[#1A1A1A] text-white font-bold p-4 rounded-lg mb-3 cursor-pointer hover:bg-[#1A1A1A]/90"
            onClick={()=>navigate('/main')}
        >
            Regresar
        </button>
        <button 
            type='button'
            onClick={logout} 
            className="w-full border-2 border-gray-100 rounded-lg text-rose-500 font-bold p-4 cursor-pointer flex justify-center items-center gap-2"
        >
          <IoMdLogOut className="text-xl" />
          <p>Cerrar Sesión</p>
        </button>
      </section>

    </div>
  )
}
