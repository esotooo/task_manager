import { useTask } from "../../../Hooks/Tasks/useTask"

export default function TasksDesktopView() {

    const {tasks, formatDate} = useTask()

  return (
    <div className="mt-6 hidden md:block ">
        <table className="min-w-full">
        <thead className="border-b border-b-gray-200 text-[16px]">
            <tr>
                <th className="px-1 py-2">Creado</th>
                <th className="px-1 py-2">Título</th>
                <th className="px-1 py-2">Descripción</th>
                <th className="px-1 py-2">Fecha límite</th>
                <th className="px-1 py-2">Prioridad</th>
                <th className="px-1 py-2">Estado</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
                <tr key={task.id_task} className='hover:bg-gray-100 text-center text-[13px]'>
                    <td className="px-1 py-2">{formatDate(task.create_date)}</td>
                    <td className="px-1 py-2">{task.task_title}</td>
                    <td className="px-1 py-2">...</td>
                    <td className="px-1 py-2">{formatDate(task.due_date)}</td>
                    <td className={`px-1 py-2`}>
                        <p 
                            className={`mx-6 rounded-lg
                            ${task.priority === 'Alta' ? 'bg-rose-200' : ''}
                            ${task.priority === 'Media' ? 'bg-amber-200' : ''}
                            ${task.priority === 'Baja' ? 'bg-lime-200' : ''}`}
                        >
                            {task.priority}
                        </p>
                    </td>
                    <td className={`px-1 py-2`}>
                        <p 
                            className={`rounded-lg
                            ${task.state === 'Cancelada' ? 'bg-rose-200' : ''}
                            ${task.state === 'Pendiente' ? 'bg-amber-200' : ''}
                            ${task.state === 'Completada' ? 'bg-lime-200' : ''}
                            ${task.state === 'En progreso' ? 'bg-gray-200' : ''}`}
                        >
                            {task.state}
                        </p>
                    </td>                        
                    <td className="px-1 py-2">
                        <button className="cursor-pointer">
                            ...
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}
