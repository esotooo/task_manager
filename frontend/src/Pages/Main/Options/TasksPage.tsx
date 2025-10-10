import DesktopSidebar from "../../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../../Components/Main/MobileOptionsBar";
import SearchBar from "../../../Components/Main/Tasks/SearchBar";
import TaskForm from "../../../Components/Main/Tasks/TaskForm";
import { useTaskStore } from "../../../Store/useTaskStore";

export default function TasksPage() {

    const {isOpen} = useTaskStore()

  return (
    <div className="block w-screen h-screen md:flex">
        <DesktopSidebar />
        <MobileOptionsBar />

        <main className="flex-1 md:px-12 md:py-8 px-5 py-5 mt-25 md:mt-0">
            <h1 className="text-3xl font-bold">Tareas</h1>

            {!isOpen ? 
                <SearchBar />
            :  
                <TaskForm />
            }
            
        </main>

    </div>
  )
}
