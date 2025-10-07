import type { JSX } from "react"
import { GrTasks } from "react-icons/gr";
import { GoGraph } from "react-icons/go";
import { FaHouse, FaCalendar } from "react-icons/fa6";

type OptionsType = {
    id: number, 
    name: string, 
    icon: JSX.Element,
    route: string
}

export const options : OptionsType[] = [
    {
        id: 1,
        name: "Inicio",
        icon: <FaHouse />,
        route: '/main'
    },
    {
        id: 2,
        name: "Tareas",
        icon: <GrTasks />,
        route: '/tasks' 
    },
    {
        id: 3,
        name: "Gráficos",
        icon: <GoGraph />,
        route: '/graphs'
    },
    {
        id: 4,
        name: "Calendario",
        icon: <FaCalendar />,
        route: '/calendar'
    }
]
