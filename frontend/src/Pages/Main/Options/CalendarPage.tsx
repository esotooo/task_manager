import DueDateCalendar from "../../../Components/Main/Calendar/DueDateCalendar";
import DesktopSidebar from "../../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../../Components/Main/MobileOptionsBar";

export default function CalendarPage() {
  return (
    <main className="block w-screen h-screen md:flex">
        <DesktopSidebar />
        <MobileOptionsBar />

        <section className="flex-1 md:px-7 md:py-8 px-5 py-5 mt-25 md:mt-0 ">
            <h1 className="text-3xl font-bold pb-5">Calendario</h1>
            <div className="flex-1 overflow-auto shadow-lg p-5 border border-gray-100 rounded-lg">
              
              <DueDateCalendar />
            </div>
        </section>
    </main>
  )
}
