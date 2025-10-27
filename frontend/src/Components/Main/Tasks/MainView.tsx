import { useState, useEffect } from "react";
import DesktopSearchbar from "./DesktopSearchbar";
import TasksDesktopView from "./TasksDesktopView";
import TasksMobileView from "./TasksMobileView";
import { useTask } from "../../../Hooks/Tasks/useTask";
import ConfirmDeleteWindow from "./ConfirmDeleteWindow";
import MobileSearchbar from "./MobileSearchbar";

export default function MainView() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {confirmDelete} = useTask()

  return (
    <>
      {isMobile ? <MobileSearchbar /> : <DesktopSearchbar /> }
      {isMobile ? <TasksMobileView /> : <TasksDesktopView />}
      {confirmDelete.open && (<ConfirmDeleteWindow />)}
    </>
  );
}
