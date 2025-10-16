import { useTask } from "../../../Hooks/Tasks/useTask";

export default function TaskForm() {

  const {form, priorities, handleChange, handleCancel, handleSubmit} = useTask();

  return (
    <section className="mt-6 mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            Agregar Tarea
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Título */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="task_title"
                    value={form.task_title ?? ''}
                    placeholder="Ej. Corregir bugs del dashboard"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>

            {/* Prioridad */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                    value={form.id_priority}
                    name="id_priority"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onChange={handleChange}
                >
                    <option value="">Seleccionar prioridad</option>
                    {priorities.map(i => (
                        <option value={i.id_priority} key={i.id_priority}>{i.priority}</option>
                    ))}
                </select>
            </div>

            {/* Descripción */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    onChange={handleChange}
                    value={form.task_description ?? ''}
                    name="task_description"
                    rows={3}
                    placeholder="Agrega detalles o notas sobre la tarea..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                ></textarea>
            </div>

            {/* Fecha límite */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
                <input
                    onChange={handleChange}
                    value={form.due_date ?? ''}
                    name="due_date"
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>

            {/* Botones */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
                <button
                    className="bg-amber-500 hover:bg-amber-600 px-4 py-2 cursor-pointer text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto"
                    type="submit"
                >
                    Agregar tarea
                </button>
                <button
                    className="bg-gray-800 hover:bg-gray-900 px-4 py-2 cursor-pointer text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto"
                    onClick={handleCancel}
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </section>
  )
}
