import { useTask } from "../../../Hooks/Tasks/useTask";
import { FormInput, SelectInput, TextArea } from "../../Layout/ReusableInput";

export default function TaskForm() {

    const {
        form, 
        priorities, 
        handleChange, 
        handleCancel, 
        handleSubmit, 
        isEditing, 
        states, 
        isViewing,
        getFieldsError,
        clearFieldsError
    } = useTask();

  return (
    <section className="mt-2 mx-auto bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            {isViewing ? 'Ver Tarea' : isEditing ? 'Editar Tarea'  : 'Agregar Tarea' }
        </h2>

        <form className="flex flex-col md:max-h-[77vh] gap-3 md:max-w-full overflow-y-auto" onSubmit={handleSubmit}>

            {/* Título */}
            <div className="flex flex-col px-1">
                <label className="text-sm font-medium text-gray-700 mb-1">Título</label>
                <FormInput 
                    type="text"
                    onChange={handleChange}
                    className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    name="task_title"
                    value={form.task_title ?? ''}
                    disabled={isViewing}
                    placeholder="Ej. Corregir bugs del dashboard"
                    variant='custom'
                    error={getFieldsError('task_title')}
                    setError={() => clearFieldsError('task_title', '')}
                />
            </div>

            {/* Prioridad */}
            <div className="flex flex-col px-1">
                <label className="text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <SelectInput 
                    value={form.id_priority ?? 0}
                    name="id_priority"
                    className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    onChange={handleChange}
                    disabled={isViewing}
                    error={getFieldsError('id_priority')}
                    setError={() => clearFieldsError('id_priority', '')}
                    options={priorities.map(p => ({value: p.id_priority, label: p.priority}))}
                    placeholder="Seleccione una prioridad"
                />
            </div>

            {(isEditing || isViewing) &&(
                <div className="flex flex-col px-1">
                    <label className="text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <SelectInput 
                        name="id_state"
                        value={form.id_state ?? 0}
                        className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                            ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                        onChange={handleChange}
                        disabled={isViewing}  
                        error={getFieldsError('id_state')}
                        setError={() => clearFieldsError('id_state', '')}
                        options={states.map(i => ({value: i.id_state, label: i.state}))} 
                        placeholder="Seleccione un estado" 
                    />
                </div>
            )}

            {/* Descripción */}
            <div className="flex flex-col px-1">
                <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <TextArea 
                    placeholder="Agrega detalles o notas sobre la tarea..."
                    className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                    disabled={isViewing}
                    onChange={handleChange}
                    name="task_description"
                    value={form.task_description ?? ''}
                    error={getFieldsError('task_description')}
                    setError={() => clearFieldsError('task_description', '')}
                />
            </div>

            {/* Fecha límite */}
            <div className="flex flex-col px-1">
                <label className="text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
                <FormInput 
                    onChange={handleChange}
                    value={form.due_date ?? ''}
                    name="due_date"
                    type="date"
                    className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}               
                    placeholder=""
                    disabled={isViewing}
                    variant="custom"
                    error={getFieldsError('due_date')}
                    setError={() => clearFieldsError('due_date', '')}
                    />
            </div>

            {(isEditing || isViewing) &&(
                <div className="flex flex-col px-1">
                    <label className="text-sm font-medium text-gray-700 mb-1">Fecha Finalización</label>
                    <FormInput 
                        onChange={handleChange}
                        value={form.end_date ?? ''}
                        name="end_date"
                        type="date"
                        className={`border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500
                            ${isViewing ? 'disabled:bg-gray-200 text-gray-500/70 cursor-not-allowed' : ''}`}
                        disabled={isViewing}
                        variant="custom"
                        placeholder=""
                    />
                </div>
            )}

            {/* Botones */}
            <div className="flex flex-col md:flex-row gap-3 mt-3 px-1">
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
