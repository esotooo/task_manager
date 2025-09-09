import RegisterUserForm from "../../Components/Auth/RegisterUserForm";
import { SiTask } from "react-icons/si";

export default function registerUser() {

    return (
        <div className="w-screen h-screen flex flex-col items-start sm:py-20 sm:items-center py-10 px-5">
            <div className="flex flex-row items-center">
                <SiTask className="sm:text-7xl text-5xl"/>
                <h1 className="sm:text-6xl text-5xl">
                Task <span className="font-extrabold -ml-2">Flow</span></h1>  
            </div>
            <RegisterUserForm />
        </div>
    )
}
