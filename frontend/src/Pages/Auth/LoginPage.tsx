import LoginForm from "../../Components/Auth/LoginForm";
import { SiTask } from "react-icons/si";
import { currentYear } from "../../Utils/helpers";


export default function LoginPage() {

    return (
        <section 
        className="bg-[#1A1A1A] w-screen h-screen grid grid-cols-1 lg:grid-cols-[2fr_1fr]"
        >
            <div className="order-1 mt-0 lg:mt-24 lg:px-40 flex flex-col justify-center lg:justify-between px-4 ">
            
                {/** DISEÑO PARA COMPUTADORA */}
                <div className="hidden lg:block">
                    <SiTask className="text-white lg:text-9xl text-6xl"/>
                    <div className="mt-20 max-w-full">
                        <h1 className="text-4xl md:text-6xl text-white font-bold">Bienvenido a</h1>
                        <h1 className="text-5xl md:text-8xl text-white whitespace-nowrap">
                        Task <span className="font-extrabold -ml-2">Flow!</span>
                        </h1>
                    </div>
                </div>

                {/** ENCABEZADO PARA TELEFONO Y TABLET */}
                <div className="lg:hidden flex flex-col sm:flex-row  justify-center items-center gap-4 px-2">
                    <SiTask className="text-white text-5xl sm:text-6xl"/>
                    <div>
                        <h1 className="text-4xl sm:text-6xl text-white">
                        Task <span className="-ml-2 sm:-ml-3 font-extrabold">Flow!</span>
                        </h1>
                    </div>
                </div>

                {/** FOOTER SOLO PARA PC */}
                <p className="text-sm text-white mb-5 text-center hidden lg:block">
                    {`© ${currentYear} TaskFlow. Todos los derechos reservados.`}
                </p>
            </div>

            <LoginForm/>

        </section>
    )
}
