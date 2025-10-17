import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TasksDesktopView from "./TasksDesktopView";
import TasksMobileView from "./TasksMobileView";
import { useTask } from "../../../Hooks/Tasks/useTask";
import ConfirmDeleteWindow from "./ConfirmDeleteWindow";

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
      <SearchBar />
      {isMobile ? <TasksMobileView /> : <TasksDesktopView />}
      {confirmDelete.open && (<ConfirmDeleteWindow />)}
    </>
  );
}
