import { LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useTask } from "../../../Hooks/Tasks/useTask";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function TasksMobileView() {
  const { tasks, formatDate, editTask} = useTask();

  const eliminando = () => {
    console.log("Eliminando")
  }

  const leadingActions = (id_task: number, id_user: number) => {
    return (
        <LeadingActions>
            <SwipeAction onClick={() => editTask(id_task, id_user)}>
                <div className="flex items-center bg-amber-200 font-bold p-5  rounded-tl-lg rounded-bl-lg">Editar</div>
            </SwipeAction>
        </LeadingActions>
    )
  }

  const trailingActions = () => {
    return (
        <TrailingActions>
            <SwipeAction onClick={eliminando}>
                <div className="flex items-center bg-rose-200 font-bold p-5 rounded-tr-lg rounded-br-lg">Eliminar</div>
            </SwipeAction>
        </TrailingActions>
    )
  }

  return (
    <SwipeableList>
      {tasks.map((task) => (
        <SwipeableListItem
            key={task.id_task}
            leadingActions={leadingActions(task.id_task, task.id_user)}
            trailingActions={trailingActions()}
            className="mb-3"
        >
                <div className="pt-4 px-4 pb-2 border border-gray-100 relative overflow-hidden w-full">
                    <div
                        className={`py-1 px-6 absolute -mt-3 -ml-4 text-sm rounded-tr-md rounded-br-md italic
                        ${task.priority === "Alta" ? "bg-rose-200" : ""}
                        ${task.priority === "Media" ? "bg-amber-200" : ""}
                        ${task.priority === "Baja" ? "bg-lime-200" : ""}`}
                    >
                        <p>{task.priority}</p>
                    </div>
                    <div className="mt-5">
                        <h3 className="font-bold">{task.task_title}</h3>
                        <p className="text-sm">
                            Fecha límite:{" "}
                            <span className="font-semibold">{formatDate(task.due_date)}</span>
                        </p>
                        <p className="text-sm">
                            Estado:
                            <span
                                className={`font-semibold
                                ${task.state === "Cancelada" ? "text-rose-400" : ""}
                                ${task.state === "Pendiente" ? "text-amber-400" : ""}
                                ${task.state === "Completada" ? "text-lime-400" : ""}
                                ${task.state === "En progreso" ? "text-gray-400" : ""}`}
                            >
                                {" "}{task.state}
                            </span>
                        </p>
                        <div className="flex items-center justify-center text-[20px] -mt-1">
                            <RiArrowDropDownLine />
                        </div>
                    </div>
                </div>
        </SwipeableListItem>
      ))}
    </SwipeableList>
  )
}
