import { useAuth } from "../Auth/useAuth"
import { useTaskStore, ValidationError } from "../../Store/useTaskStore"
import React, { useEffect, useRef } from "react"
import {toast} from 'react-hot-toast'
import { useInputError } from "../Layout/useInputError"

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
        optionId,
        selectedOption,
        rangeDates,
        filterOption,
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
        searchTasks,
        openForm,
        setSelectedOption,
    } = useTaskStore();

    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()

    const optionsList = useRef<HTMLDivElement | null>(null) //para lista de opciones de cada tarea
    const filters = useRef<HTMLDivElement | null>(null) //para los diferentes filtros

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
            setFieldMessage({})

            await fetchTasks(user.data.id_user)
            setTimeout(() => {
                resetForm()
                closeForm()
            }, 1000)
           
        } catch(error : unknown) {
            if(error instanceof ValidationError){
                setFieldMessage(error.fields)
            }
            else if(error instanceof Error){
                toast.error(error.message, { duration: 4000, position: "top-right" })                            
            }else{
                toast.error('Error en la conexion con el servidor.', {duration: 4000, position: "top-right"})
            }
        }
    }
    

    const handleSearch = async () => {
        let start_date: string | undefined
        let end_date: string | undefined
    
        if(rangeDates[0]) start_date = rangeDates[0].toISOString().split('T')[0]; 
        if(rangeDates[1]) end_date = rangeDates[1].toISOString().split('T')[0];
    
        if(user?.data.id_user == null) return
        await searchTasks({
            id_user: user?.data.id_user,
            task_title: selectedOption.task_title || undefined,
            id_priority: selectedOption.id_priority || undefined,
            id_state: selectedOption.id_state || undefined,
            start_date,
            end_date
        })
    }
        
    const handleDelete = async () => {
        if(confirmDelete.id_task == null || !user?.data.id_user) return;
    
        try {
            const msg = await deleteTask(confirmDelete.id_task, user.data.id_user)
            await fetchTasks(user.data.id_user)
            toast.success(msg, { duration: 4000, position: "top-right" })
            closeWindow()
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
        fetchStates()
    },[fetchPriorities, fetchStates]) 

    useEffect(() => {
        if (user?.data.id_user) {
          fetchTasks(user.data.id_user)
        }
    }, [user?.data.id_user])
      
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if((optionsList.current && !optionsList.current.contains(e.target as Node)) || (filters.current && !filters.current.contains(e.target as Node))){
                if(openRowId !== null) toggleRow(openRowId)
                if(filters !== null && optionId !== null) filterOption(optionId)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return() => document.removeEventListener("mousedown", handleClickOutside) 
    },[openRowId, toggleRow, filterOption, optionId])

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
        optionId,
        filters,
        selectedOption,

        //Funciones
        handleChange,
        handleSubmit,
        handleCancel,
        formatDate,
        toggleRow,
        editTask,
        openWindow,
        openForm,
        closeWindow,
        handleDelete,
        seeTask,
        filterOption,

        getFieldsError,
        clearFieldsError,
        setSelectedOption,
        handleSearch,

    })    
}