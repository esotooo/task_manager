import { useEffect, useRef } from "react";
import lottie from "lottie-web";

type StateWindowsProps = {
  showConfirm: boolean;
  showError: boolean;
  message: string | null;
  container: HTMLDivElement | null;
}

export default function StateWindows({ showConfirm, showError, message }: StateWindowsProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ((showConfirm || showError) && container.current) {
        const animInstance = lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: showConfirm ? "/gif/Success.json" : "/gif/error.json",
        });

        return () => animInstance.destroy();
        }
    }, [showConfirm, showError]);
    

    if (!showConfirm && !showError) return null;

    return (
        <div className="absolute inset-0 bg-white flex flex-col rounded-lg z-10">
            <div className="flex items-center p-4 gap-2">
                <div className="w-15 h-15" ref={container}></div>
                <p className="font-bold">{message}</p>
            </div>
        </div>
    )
}
