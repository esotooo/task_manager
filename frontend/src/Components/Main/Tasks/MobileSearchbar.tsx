import { useState } from "react";
import { useTask } from "../../../Hooks/Tasks/useTask"
import { IoFilterOutline } from "react-icons/io5";


export default function MobileSearchbar() {

    const {handleSearchByTitle} = useTask()
    const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="fixed bottom-0 left-0 w-full px-5 py-1 z-50 bg-white">
        <div className="flex my-4 items-center gap-4">
            <input 
                type="text" 
                placeholder="Buscar tareas..."
                className="px-3 py-2 text-sm w-full border border-gray-100 rounded-lg shadow-lg"
                onChange={handleSearchByTitle}
            /> 
            <div>
                <button className="rounded-full shadow-lg p-2 border text-[20px] border-gray-100 cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <IoFilterOutline />
                </button>
                {showFilters && (
                    <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl p-4 z-50 animate-slide-up">
                        <h3 className="text-base font-semibold mb-3">Filtrar por</h3>
                        <div className="flex flex-col gap-3">
                        <select className="border rounded-lg p-2">
                            <option>Prioridad</option>
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                        <select className="border rounded-lg p-2">
                            <option>Estado</option>
                            <option>Pendiente</option>
                            <option>Completada</option>
                        </select>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg font-semibold cursor-pointer">
                                Aplicar filtros
                            </button>
                            <button 
                                className="mt-4 w-full bg-black text-white py-2 rounded-lg font-semibold cursor-pointer"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Regresar
                            </button>
                        </div>
  
                    </div>
                    )}
            </div> 

        </div>
    </section>
  )
}
