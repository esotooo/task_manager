import { useTask } from "../../../Hooks/Tasks/useTask"

export default function ConfirmDeleteWindow() {

    const {closeWindow, handleDelete} = useTask()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-120">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Eliminar
            </h2>
            <p className="text-[15px] mb-10">¿Estás seguro que deseas eliminar esta tarea?</p>
            <div className="flex justify-end gap-2 flex-col md:flex-row">
            <button
                type="submit"
                className="bg-amber-500 text-white text-sm px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-amber-500/85 transition"
                onClick={handleDelete}
            >
                Eliminar
            </button>
            <button
                type="button"
                onClick={closeWindow}
                className="bg-[#1A1A1A] text-white text-sm rounded-lg px-6 py-2 font-bold cursor-pointer hover:bg-[#1A1A1A]/85 transition"
            >
                Cancelar
            </button>
            </div>
        </div>
    </div>

  )
}
