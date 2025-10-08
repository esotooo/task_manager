import { useAuth } from "../../Hooks/Auth/useAuth"
import { GiHamburgerMenu } from "react-icons/gi";
import { SiTask } from "react-icons/si";
import { options } from "../../Utils/optionsList";
import { Link, useLocation } from "react-router-dom";

export default function DesktopSidebar() {

    const { user, setIsOpen, isOpen } = useAuth()
    const location = useLocation()

  return (
    <>
        {/** SIDEBAR */}
        <section className={`bg-[#1A1A1A] px-7 py-5 hidden flex-col transition-all duration-300 md:flex
            ${isOpen ? 'w-[250px]': 'w-[100px] '} `}
        >

            {/** BOTON PARA EXTENDER O MINIMIZAR MENU */}
            <button onClick={() => setIsOpen(!isOpen)} className="self-end">
                <GiHamburgerMenu className="text-white cursor-pointer text-3xl" />
            </button>

            {/** LOGOTIPO */}
            <div className="flex items-center mt-10 px-2">
                <SiTask
                    className="text-white text-3xl transition-transform duration-300"
                    style={{ transform: isOpen ? 'scale(1)' : 'scale(1.3)' }}
                />
                <h1 className={`text-3xl text-white whitespace-nowrap transition-all duration-300 overflow-hidden
                    ${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 ml-0'}`}>
                    Task <span className="font-extrabold -ml-2">Flow</span>
                </h1>
            </div>

            {/** SIDEBAR OPTIONS */}
            <div className="text-white mt-20">
                {options.map(option => {

                    const isActive = location.pathname === option.route
                    return(
                    <Link 
                        to={option.route}
                        key={option.id}
                        className={`flex items-center space-x-4 w-full py-3.5 px-2 hover:bg-[#2A2A2A] hover:rounded-lg transition-colors duration-200 cursor-pointer
                            ${isActive ? 'text-amber-500' : ''}`}
                    >
                        <div className="text-2xl transition-all"
                        style={{ transform: isOpen ? 'scale(1)' : 'scale(1.1)' }}
                    >
                            {option.icon}
                        </div>
                        <h2 className={`whitespace-nowrap transition-all duration-300 overflow-hidden
                            ${isOpen ? 'opacity-100 max-w-full ml-2' : 'opacity-0 max-w-0 ml-0' }`}
                        >
                            {option.name}
                        </h2>

                    </Link>
                    )
                })}
            </div>


            <Link to={'/profile'} className="text-white mt-auto flex items-center mb-4 hover:bg-[#2A2A2A] hover:rounded-lg transition-colors duration-200 py-3.5 px-1.5">
                {/* Círculo fijo, sin animación */}
                <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                </div>

                {/* Texto animado suavemente */}
                <div className="overflow-hidden transition-all duration-300 cursor-pointer">
                    <h3 className={`whitespace-nowrap font-bold transition-all duration-300
                        ${isOpen ? 'opacity-100 max-w-[200px] ml-2' : 'opacity-0 max-w-0 ml-0'}`}
                    >
                        {user?.data.firstname} {user?.data.lastname} 
                    </h3>
                </div>
            </Link> 
        </section>
    </>
  )
}
