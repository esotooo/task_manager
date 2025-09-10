import { useRegisterForm } from "../../Hooks/useRegisterForm"

export default function StateWindows() {

    const {showConfirm, showError, container, state} = useRegisterForm()

    return (
        <>
            {showConfirm && (
                <div className="absolute inset-0 bg-white flex flex-col rounded-lg z-10">
                    <div className="flex items-center p-4">
                        <div className="w-15 h-15" ref={container}></div>
                        <p className="font-bold">{state.message}</p>
                    </div>
                </div>
            )}

            {showError &&(
                <div className="absolute inset-0 bg-white flex flex-col rounded-lg z-10">
                    <div className="flex items-center p-4">
                        <div className="w-15 h-15" ref={container}></div>
                        <p className="font-bold">{state.message}</p>
                    </div>
                </div>
            )}

    </>
    )
}
