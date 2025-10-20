import { useAuth } from "../Auth/useAuth"
import { useTaskStore } from "../../Store/useTaskStore";
import { useEffect, useRef } from "react";
import {toast} from 'react-hot-toast'

export function useTask(){
    const { user } = useAuth()
    const { 
        form,
        priorities, 
        tasks, 
        message, 
        openRowId,
        isEditing,
        states,
        confirmDelete,
        isViewing,

        toggleRow,
        fetchPriorities, 
        createTask, 
        closeForm, 
        fetchTasks, 
        updateForm, 
        resetForm,
        editTask,
        fetchStates,
        updateTask,
        openWindow,
        closeWindow,
        deleteTask,
        seeTask,
    } = useTaskStore();

    const optionsList = useRef<HTMLDivElement | null>(null)

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES'); 
    }

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
      
        const numericFields = ["id_state", "id_priority"];
        const newValue = numericFields.includes(name) && value !== "" ? Number(value) : value;

        updateForm(name as keyof typeof form, newValue);
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user?.data.id_user) return
        try{

            const payload = {
                ...form,
                id_user: user.data.id_user,
                end_date: form.end_date === "" ? null : form.end_date,
                due_date: form.due_date === "" ? null : form.due_date
            }

            let msg = ''

            if(isEditing){
                msg = await updateTask(payload)
            }else{
                msg = await createTask(payload)
            }

            toast.success(msg, { duration: 4000, position: "top-right" })
    
            await fetchTasks(user.data.id_user)
            setTimeout(() => {
                resetForm()
                closeForm()
            }, 1000)
           
        } catch(err : unknown) {
            if(err instanceof Error){
                toast.error(err.message, { duration: 4000, position: "top-right" })
            }else{
                toast.error('Error en la conexion con el servidor.', {duration: 4000, position: "top-right"})
            }
        }
    }
    
    const handleDelete = async () => {
        if(confirmDelete.id_task == null || !user?.data.id_user) return;
    
        try {
            const msg = await deleteTask(confirmDelete.id_task, user.data.id_user)
            toast.success(msg, { duration: 4000, position: "top-right" })
            closeWindow()
            await fetchTasks(user.data.id_user)
        } catch(err : unknown) {
            if(err instanceof Error){
                toast.error(err.message, { duration: 4000, position: "top-right" })
            }else{
                toast.error('Error en la conexion con el servidor.', {duration: 4000, position: "top-right"})
            }
        }
    }
    
    const handleCancel = () => {
        resetForm()
        closeForm()
    }

    useEffect(() => {
        fetchPriorities()
    },[fetchPriorities]) 

    useEffect(() => {
        fetchStates()
    },[fetchStates]) 

    useEffect(() => {
        if (user?.data.id_user) {
          fetchTasks(user.data.id_user)
        }
    }, [user?.data.id_user, fetchTasks])
      
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(optionsList.current && !optionsList.current.contains(e.target as Node)){
                if(openRowId !== null) toggleRow(openRowId)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return() => document.removeEventListener("mousedown", handleClickOutside) 
    },[openRowId, toggleRow])

    useEffect(() => {
        if(confirmDelete.open){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [confirmDelete.open])

    return({
        //Estados
        form,
        priorities,
        tasks,
        message,
        openRowId,
        optionsList,
        isEditing,
        states,
        confirmDelete,
        isViewing,

        //Funciones
        handleChange,
        handleSubmit,
        handleCancel,
        formatDate,
        toggleRow,
        editTask,
        openWindow,
        closeWindow,
        handleDelete,
        seeTask
    })    
}

