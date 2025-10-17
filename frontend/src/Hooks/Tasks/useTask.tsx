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
        toggleRow,
        fetchPriorities, 
        createTask, 
        closeForm, 
        fetchTasks, 
        updateForm, 
        resetForm,
        editTask,
        isEditing,
        fetchStates,
        states,
        updateTask
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
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user?.data.id_user) return;
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
           
        } catch(err : any) {
            toast.error(err.message, { duration: 4000, position: "top-right" })
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

    return({
        form,
        handleChange,
        handleSubmit,
        handleCancel,
        priorities,
        tasks,
        message,
        formatDate,
        toggleRow,
        openRowId,
        optionsList,
        editTask,
        isEditing,
        states
    })    
}

