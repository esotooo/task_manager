import RegisterUserForm from "../../Components/Auth/RegisterUserForm";
import { SiTask } from "react-icons/si";

export default function registerUser() {

    return (
        <div className="w-screen h-screen flex flex-col items-center py-20">
            <div className="flex flex-row items-center">
                <SiTask className="text-7xl"/>
                <h1 className="text-6xl whitespace-nowrap">
                Task <span className="font-extrabold -ml-2">Flow</span></h1>  
            </div>
            <RegisterUserForm />
        </div>
    )
}
