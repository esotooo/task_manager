import { useTask } from "../../../Hooks/Tasks/useTask"
import { FaEye } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";


export default function TasksDesktopView() {

    const {tasks, formatDate, toggleRow, openRowId, optionsList, editTask} = useTask()
    
  return (
    <section className="max-h-[510px] max-w-auto overflow-x-hidden overflow-y-auto">
        <table className="min-w-full">
        <thead className="sticky top-0 bg-white border-b border-gray-200 z-10">
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
                <tr key={task.id_task} className='hover:bg-gray-100 text-center text-[13px] border-b border-b-gray-100'>
                    <td className="px-1 py-2">{formatDate(task.create_date)}</td>
                    <td className="px-1 py-2">{task.task_title}</td>
                    <td className="relative group flex justify-center items-center">
                    <button
                        className="flex items-center gap-1 text-gray-500 hover:text-black 
                        transition-colors duration-200 py-4 "
                    >
                        <FaEye />
                        <span>Ver más</span>
                    </button>
                        <div 
                            className="absolute -left-14 top-full mt-1 hidden group-hover:block 
                            bg-white border border-gray-100 rounded-lg p-3 shadow-lg z-10 w-80 text-xs
                            opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                        >
                            {task.task_description}
                        </div>
                    </td>
                    <td className="px-1 py-2">{formatDate(task.due_date)}</td>
                    <td className={`px-1 py-2`}>
                        <p 
                            className={`mx-6 rounded-full
                            ${task.priority === 'Alta' ? 'bg-rose-200' : ''}
                            ${task.priority === 'Media' ? 'bg-amber-200' : ''}
                            ${task.priority === 'Baja' ? 'bg-lime-200' : ''}`}
                        >
                            {task.priority}
                        </p>
                    </td>
                    <td className={`px-1 py-2`}>
                        <p 
                            className={`rounded-full
                            ${task.state === 'Cancelada' ? 'bg-rose-200' : ''}
                            ${task.state === 'Pendiente' ? 'bg-amber-200' : ''}
                            ${task.state === 'Completada' ? 'bg-lime-200' : ''}
                            ${task.state === 'En progreso' ? 'bg-gray-200' : ''}`}
                        >
                            {task.state}
                        </p>
                    </td>                        
                    <td className="relative group flex justify-center items-center px-1 py-2">
                        <button className="cursor-pointer" onClick={() => toggleRow(task.id_task)} type="button">
                            <HiDotsVertical />
                        </button>
                        {openRowId === task.id_task && (
                            <div className="absolute -left-24 top-full mt-1 
                                bg-white border border-gray-100 rounded-lg p-3 shadow-lg z-10 w-30 text-xs flex flex-col"
                                ref={optionsList}
                            >
                                <button type="button" className="cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300 w-full py-2" >
                                    Ver
                                </button>
                                <button type="button" className="cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300 w-full py-2" onClick={() => editTask(task.id_task, task.id_user)} >
                                    Editar
                                </button>
                                <button type="button" className="cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300 w-full py-2" >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
 
        </table>

    </section>
  )
}
