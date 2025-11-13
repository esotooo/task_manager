import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es-us'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from 'react'
import { api } from '../../../Utils/axiosInstance'
import { useAuth } from '../../../Hooks/Auth/useAuth'

export default function DueDateCalendar() {

    const {user} = useAuth()

    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        try{
            const res = await api.get(`/api/calendar/get-by-due_date?id_user=${user?.data.id_user}`);
            if (res.status === 200 && Array.isArray(res.data.data)) {
                const formatted = res.data.data.map(task => ({
                    id: task.id_task,
                    title: task.task_title,
                    start: task.due_date,
                    extendedProps: {
                        state: task.id_state
                    }
                }))
            setTasks(formatted)
        }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [user])
      
  return (
    <FullCalendar 
        plugins={[ dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        expandRows={true}
        height="100%" 
        contentHeight="auto"
        headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next"
        }}  
        eventContent={renderEventContent}
        events={tasks}
        eventClick={() => console.log('click')}
    />
  )
}

function renderEventContent({ event } : any) {
    const { title, extendedProps, id} = event
    return (
      <div
        className={`text-sm font-semibold truncate overflow-hidden whitespace-nowrap w-full px-1 rounded-sm 
            ${extendedProps.state === 1 ? 'bg-lime-200' : ''}
            ${extendedProps.state === 2 ? 'bg-amber-200' : ''}
            ${extendedProps.state === 3 ? 'bg-rose-200' : ''}
        `}
        style={{ maxWidth: '100%' }}
        title={title}
        id={id}
      >
        {title}
      </div>
    )
  }
  