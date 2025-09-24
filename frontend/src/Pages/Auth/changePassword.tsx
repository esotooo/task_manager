import { SiTask } from "react-icons/si";
import ChangePasswordFlow from "../../features/ChangePasswordFlow";

export default function ChangePassword() {
    

  return (
    <div className="w-screen h-screen flex flex-col items-start sm:py-20 sm:items-center py-10 px-5">
      <div className="flex flex-row items-center w-full  border-b-2 border-b-gray-200 pb-6 sm:w-auto sm:border-none">
          <SiTask className="sm:text-7xl text-5xl"/>
          <h1 className="sm:text-6xl text-5xl">
          Task <span className="font-extrabold -ml-2">Flow</span></h1>  
      </div>
      <section className="sm:border sm:border-gray-200 sm:mt-10 mt-5 sm:px-5 sm:py-5 w-full mx-auto sm:max-w-2xl lg:max-w-3xl rounded-lg">
      <h2 className="font-bold text-[20px] mb-4">Cambiar Contraseña</h2>
      <ChangePasswordFlow />
      </section>
    </div>
  )
}
