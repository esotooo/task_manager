import DesktopSidebar from "../../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../../Components/Main/MobileOptionsBar";

export default function CalendarPage() {
  return (
    <div className="block w-screen h-screen md:flex">
        <DesktopSidebar />
        <MobileOptionsBar />

        <div className="flex-1 md:px-12 md:py-8 px-5 py-5 mt-25 md:mt-0">
            <h1 className="text-3xl font-bold">Calendario</h1>
        </div>
    </div>
  )
}
