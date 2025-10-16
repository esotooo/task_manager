import { useAuth } from "../Auth/useAuth"
import { useTaskStore } from "../../Store/useTaskStore";
import { useEffect } from "react";
import {toast} from 'react-hot-toast'

export function useTask(){
    const { user } = useAuth()
    const { form, priorities, tasks, message, fetchPriorities, createTask, closeForm, fetchTasks, updateForm, resetForm} = useTaskStore();

    function formatDate(dateStr: string) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES'); // 'DD/MM/YYYY'
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>  ) => {
        const {name, value} = e.target
        updateForm(name as keyof typeof form, value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user?.data.id_user) return;
    
        try{
            const msg = await createTask({...form, id_user: user.data.id_user})
            toast.success(msg, { duration: 4000, position: "top-right" })
    
            await fetchTasks(user.data.id_user)
            setTimeout(() => {
                resetForm()
                closeForm()
            }, 1000)
           
        } catch(err: any) {
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
        if (user?.data.id_user) {
          fetchTasks(user.data.id_user);
        }
    }, [user?.data.id_user, fetchTasks]);
      

    return({
        form,
        handleChange,
        handleSubmit,
        handleCancel,
        priorities,
        tasks,
        message,
        formatDate
    })    
}

