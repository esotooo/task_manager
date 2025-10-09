import type { JSX } from "react"
import { FaHouse, FaCalendar } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";


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
        icon: <FaTasks />,
        route: '/tasks' 
    },
    {
        id: 3,
        name: "Gráficos",
        icon: <BsGraphUpArrow />,
        route: '/graphs'
    },
    {
        id: 4,
        name: "Calendario",
        icon: <FaCalendar />,
        route: '/calendar'
    }
]
