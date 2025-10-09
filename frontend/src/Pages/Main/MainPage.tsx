import DesktopSidebar from "../../Components/Main/DesktopSidebar";
import MobileOptionsBar from "../../Components/Main/MobileOptionsBar";



export default function MainPage() {

    return (
        <div className="block w-screen h-screen md:flex">

            <DesktopSidebar />
            <MobileOptionsBar />

            {/* Contenido principal */}
            <div className="flex-1 md:px-12 md:py-8 px-5 py-5 mt-25 md:mt-0">
                {/** GRAFICOS */}
                <section className="mb-6">
                    <h1 className="text-3xl font-bold mb-3">Inicio</h1>
                    <h2 className="text-[18px] font-bold">Gráficas</h2>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
                        <div className="border-gray-200 border-1 md:p-30 p-20 text-center rounded-lg">
                            Graficas
                        </div>
                        <div className="border-gray-200 border-1 md:p-30 p-20 text-center rounded-lg">
                            Graficas
                        </div>
                    </div>
                </section>
                
                {/** TAREAS */}
                <section>
                    <h1 className="text-[18px] font-bold">Tareas</h1>
                    <div className="space-y-3 mt-5">
                        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-50">
                            <div>
                            <h3 className="font-semibold">Diseñar página de login</h3>
                            <p className="text-sm text-gray-500">Fecha límite: 10 oct 2025</p>
                            </div>
                            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600">
                            En progreso
                            </span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
