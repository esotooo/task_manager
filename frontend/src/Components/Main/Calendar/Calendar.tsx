import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es-us'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar() {
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
    />
  )
}
