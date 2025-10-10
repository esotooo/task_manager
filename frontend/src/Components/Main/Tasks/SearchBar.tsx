import { useTaskStore } from "../../../Store/useTaskStore"

export default function SearchBar() {

    const {openForm} = useTaskStore()

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
                />
                <select 
                    className="px-2 py-2 flex-1 md:flex-[1.2] focus:outline-none md:border-b-0
                    border-b-1 border-b-gray-100"
                >
                    <option value="">Estado</option>
                </select>
            </div>

            {/* Fechas */}
            <div className="flex flex-col sm:flex-row mt-0 md:mt-3 w-full md:justify-end ">
                <div className="flex items-center px-3 py-2 sm:border-r sm:border-r-gray-100 sm:border-b-0 flex-1 border-b border-b-gray-100 md:flex-none">
                    <label className="mr-1 whitespace-nowrap">Desde:</label>
                    <input 
                    type="date" 
                    className="focus:outline-none w-full"
                    />
                </div>
                <div className="flex items-center px-3 py-2 flex-1 md:flex-none">
                    <label className="mr-1 whitespace-nowrap">Hasta:</label>
                    <input 
                    type="date" 
                    className="focus:outline-none w-full"
                    />
                </div>
            </div>
        </section>
        <button 
                className="bg-[#1A1A1A] px-4 py-2 text-sm font-bold text-white rounded-lg cursor-pointer w-full md:w-auto"
                type="button"
                onClick={() => openForm()}
            >
                Agregar Tarea
        </button>
    </>

  )
}
