import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";
import { options } from "../../Utils/optionsList";

export default function MobileOptionsBar() {
  return (
    <>
      <section className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <div className="flex items-center justify-between mb-2 mt-1 px-5">
                {/** LOGOTIPO */}
                <div className="flex items-center">
                    <SiTask
                        className="text-[25px] transition-transform duration-300"
                    />
                    <h1 className={`text-[25px] whitespace-nowrap transition-all duration-300 overflow-hidden`}>
                        Task <span className="font-extrabold -ml-1">Flow</span>
                    </h1>
                </div>
                <Link to={'/profile'}>
                    {/* Círculo fijo, sin animación */}
                    <div className="w-10 h-10 rounded-full bg-black flex-shrink-0 flex items-center justify-center"></div>
                </Link> 
            </div>
            <div className="border-t-1 border-gray-100 flex justify-between px-0">
                {options.map(option => (
                    <Link
                        to={option.route}
                        key={option.id}
                        className="flex-1 flex justify-center items-center text-2xl border-r-1 border-b-2 border-b-gray-300 border-r-gray-100 py-3 hover:bg-gray-100 transition last:border-r-0"
                        >
                        <div>
                            {option.icon}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    </>
  )
}
