import { useTaskStore } from "../../../Store/useTaskStore"

export default function TaskForm() {
 
    const { closeForm } = useTaskStore();

  return (
    <section className="mt-5">
        <h2 className="text-[20px] font-semibold ">Agregar Tarea</h2>
        <form className="mt-5 flex flex-col">
            
            <label htmlFor="" className="text-[15px] ">Título</label>
            <input type="text" placeholder=""/>

            <label htmlFor="" className="text-[15px] ">Descripción</label>
            <textarea name="" id=""></textarea>

            <label htmlFor="" className="text-[15px] ">Prioridad</label>
            <select name="" id="">
                <option value="">Alta</option>
            </select>
            
            <label htmlFor="" className="text-[15px] ">Fecha límite</label>
            <input type="date" placeholder=""/>

            <div className="flex flex-col md:flex-row gap-2 mt-5">
                <button 
                    className="bg-amber-500 px-4 py-2 text-sm font-bold text-white rounded-lg w-full md:w-auto"
                    type="submit"
                >
                    Agregar
                </button>
                <button 
                    className="bg-[#1A1A1A] px-4 py-2 text-sm font-bold text-white rounded-lg cursor-pointer w-full md:w-auto"
                    onClick={() => closeForm()}
                    type="button"
                >
                    Regresar
                </button>
            </div>
        </form>
    </section>
  )
}
