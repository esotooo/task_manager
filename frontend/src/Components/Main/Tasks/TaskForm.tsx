import { useTaskStore } from "../../../Store/useTaskStore";

export default function TaskForm() {
  const { closeForm } = useTaskStore();

  return (
    <section className="mt-6 mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Agregar Tarea
      </h2>

      <form className="flex flex-col gap-4">
        {/* Título */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            placeholder="Ej. Corregir bugs del dashboard"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Prioridad */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Prioridad</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Seleccionar prioridad</option>
            <option value="1">Alta</option>
            <option value="2">Media</option>
            <option value="3">Baja</option>
          </select>
        </div>

        {/* Descripción */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            rows={3}
            placeholder="Agrega detalles o notas sobre la tarea..."
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          ></textarea>
        </div>

        {/* Fecha límite */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button
            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto"
            type="submit"
          >
            Agregar tarea
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-900 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto"
            onClick={() => closeForm()}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
