import { useTask } from "../../../Hooks/Tasks/useTask";

export default function TaskForm() {

  const {form, priorities, handleChange, handleCancel, handleSubmit, isEditing, states, isViewing } = useTask();

  return (
    <section className="mt-6 mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            {isViewing ? 'Ver Tarea' : isEditing ? 'Editar Tarea'  : 'Agregar Tarea' }
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
                    disabled={isViewing}
                    placeholder="Ej. Corregir bugs del dashboard"
                    className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                />
            </div>

            {/* Prioridad */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                    value={form.id_priority ?? ''}
                    name="id_priority"
                    className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    onChange={handleChange}
                    disabled={isViewing}
                >
                    <option value="">Seleccionar prioridad</option>
                    {priorities.map(i => (
                        <option value={i.id_priority} key={i.id_priority}>{i.priority}</option>
                    ))}
                </select>
            </div>

            {(isEditing || isViewing) &&(
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                        value={form.id_state ?? ''}
                        name="id_state"
                        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                            ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                        onChange={handleChange}
                        disabled={isViewing}
                    >
                        <option value="">Seleccionar Estado</option>
                        {states.map(i => (
                            <option value={i.id_state} key={i.id_state}>{i.state}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Descripción */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    onChange={handleChange}
                    value={form.task_description ?? ''}
                    name="task_description"
                    rows={3}
                    placeholder="Agrega detalles o notas sobre la tarea..."
                    className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    disabled={isViewing}
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
                    className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    disabled={isViewing}
                />
            </div>

            {(isEditing || isViewing) &&(
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Fecha Finalización</label>
                    <input
                        onChange={handleChange}
                        value={form.end_date ?? ''}
                        name="end_date"
                        type="date"
                        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                            ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                        disabled={isViewing}
                    />
                </div>
            )}

            {/* Botones */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
                {!isViewing && (
                    <button
                        className={`bg-amber-500 hover:bg-amber-500/85 px-4 py-2 cursor-pointer text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto`}
                        type="submit"
                        disabled={isViewing}
                    >
                        {isEditing ? 'Editar Tarea' : 'Agregar Tarea'}
                    </button>
                )}

                <button
                    className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/85 px-4 py-2 cursor-pointer text-sm font-semibold text-white rounded-lg transition-all w-full md:w-auto"
                    onClick={handleCancel}
                    type="button"
                >
                    {isViewing ? 'Regresar' : 'Cancelar'}
                </button>
            </div>
        </form>
    </section>
  )
}
