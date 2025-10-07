import DesktopSidebar from "../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../Components/Main/MobileOptionsBar";



export default function MainPage() {


    return (
        <div className="block w-screen h-screen md:flex">

            <DesktopSidebar />
            <MobileOptionsBar />

            {/* Contenido principal */}
            <div className="flex-1 md:px-12 md:py-8 px-5 py-5 mt-25 md:mt-0">
                <section className="mb-6">
                    <h1 className="text-2xl font-bold">Gráficas</h1>
                </section>
                <section>
                    <h1 className="text-2xl font-bold">Tareas</h1>
                </section>
            </div>
        </div>
    );
}
