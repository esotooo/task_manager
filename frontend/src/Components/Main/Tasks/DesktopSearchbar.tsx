import { useState } from "react";
import { useTask } from "../../../Hooks/Tasks/useTask";
import { IoMdArrowDropdown } from "react-icons/io";


export default function DesktopSearchbar() {

    const {handleSearchByTitle, openForm} = useTask();

    const [open, setOpen] = useState(false)

  return (
    <>
    <section className="flex flex-col md:items-center w-auto justify-between mb-4 mt-3
        text-sm shadow-2xl md:shadow-none px-1 py-1 rounded-lg border border-gray-100 md:border-none">

            {/* Input de búsqueda + select */}
            <div className="flex flex-col w-full md:flex-row md:items-center flex-1 md:border md:border-gray-100 md:px-1 md:py-1 md:rounded-lg
            md:shadow-lg">
                <input 
                    type="text" 
                    placeholder="Buscar tareas..."
                    className="px-3 py-2 flex-1 md:flex-[4] md:border-r-1 md:border-b-0 md:border-r-gray-100 
                    border-b-1 border-b-gray-100 focus:outline-none"
                    onChange={handleSearchByTitle}
                />

                <div className="relative flex-1 border-r border-gray-100 px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                        onClick={() => setOpen(!open)}
                    >
                        <span>Prioridad</span>
                        <IoMdArrowDropdown
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    {open && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <ul className="flex flex-col text-sm text-gray-700">
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Alta
                            </li>
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Media
                            </li>
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Baja
                            </li>
                        </ul>
                        </div>
                    )}
                </div>

                <div className="relative flex-1 border-r border-gray-100 px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                        onClick={() => setOpen(!open)}
                    >
                        <span>Estado</span>
                        <IoMdArrowDropdown
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    {open && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <ul className="flex flex-col text-sm text-gray-700">
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Pendiente
                            </li>
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Completada
                            </li>
                            <li className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 cursor-pointer">
                            Baja
                            </li>
                        </ul>
                        </div>
                    )}
                </div>

                <div
                    className="px-2 py-2 flex-1 focus:outline-none" 
                >
                    <button 
                        className="flex items-center justify-between w-full cursor-pointer"
                    >
                        <p>Fecha</p>
                        <IoMdArrowDropdown />
                    </button>
                    <div>

                    </div>
                </div>
            </div>
        </section>
        <button 
                className="bg-amber-500 px-4 py-2 text-sm mb-4 font-bold text-white rounded-lg cursor-pointer w-full md:w-auto hover:bg-amber-500/85" 
                type="button"
                onClick={() => openForm()}
            >
                Agregar Tarea
        </button>
    </>

  )
}
