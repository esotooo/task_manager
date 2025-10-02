import { useNavigate, useSearchParams } from "react-router-dom";
import { SiTask } from "react-icons/si";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function VerifyResult() {

    const [searchParams] = useSearchParams();
    const verified = searchParams.get("verified") === "true";
    const navigate = useNavigate();
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
        const animInstance = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: verified ? "/gif/Success.json" : "/gif/error.json",
        });
        return () => animInstance.destroy();
        }
    }, [verified]);

    return (
        <div className="w-screen h-screen flex flex-col items-start sm:py-20 sm:items-center py-10 px-5">
            {/* Header */}
            <div className="flex flex-row items-center w-full border-b-2 border-b-gray-200 pb-6 sm:w-auto sm:border-none">
                <SiTask className="sm:text-7xl text-5xl" />
                <h1 className="sm:text-6xl text-5xl">
                    Task <span className="font-extrabold -ml-2">Flow</span>
                </h1>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center justify-center flex-1 w-full sm:w-[400px] text-center px-5">
                <div className="flex flex-col w-full justify-center items-center gap-4">
                <div ref={container} className="w-40 h-40 mb-10" />
                {verified ? (
                    <>
                    <h1 className="text-xl">
                        Tu correo ha sido verificado correctamente.
                    </h1>

                    </>
                ) : (
                    <>
                    <h1 className="text-xl">
                        El enlace no es válido o ha expirado.
                    </h1>
                    </>
                )}
                <button
                    className="mt-10 bg-black text-white font-bold w-full py-2.5 rounded-lg cursor-pointer hover:bg-black/80"
                    type="button"
                    onClick={() => navigate("/login")}
                >
                    Regresar a inicio de sesión
                </button>
                </div>

            </div>
        </div>
    );
}
