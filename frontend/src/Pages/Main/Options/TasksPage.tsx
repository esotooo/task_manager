import { Toaster } from "react-hot-toast";
import DesktopSidebar from "../../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../../Components/Main/MobileOptionsBar";
import TaskForm from "../../../Components/Main/Tasks/TaskForm";
import { useTaskStore } from "../../../Store/useTaskStore";
import MainView from "../../../Components/Main/Tasks/MainView";

export default function TasksPage() {

    const {isOpen} = useTaskStore()

  return (
    <div className="block w-screen h-screen md:flex">
        <DesktopSidebar />
        <MobileOptionsBar />

        <main className="flex-1 md:px-7 md:py-8 px-5 py-5 mt-25 md:mt-0 relative">
            <h1 className="text-3xl font-bold mb-3 md:mb-0">Tareas</h1>

            {!isOpen ? 
                <MainView />
            :  
                <TaskForm />
            }
            <Toaster />
        </main>
    </div>
  )
}
