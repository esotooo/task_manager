import { useAuth } from "../Auth/useAuth"
import { useTaskStore, ValidationError } from "../../Store/useTaskStore"
import React, { useEffect, useRef } from "react"
import {toast} from 'react-hot-toast'
import { useInputError } from "../Layout/useInputError"
import debounce from "debounce"

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
        searchByTitle,
        openForm,
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

    const debouncedSearch = debounce(async (id_user: number, task_title: string) => {
        if(!user?.data.id_user) return;
        const titleTrimmed = task_title.trim()
        id_user = user.data.id_user
        if(titleTrimmed){
            await searchByTitle(id_user, titleTrimmed)
        }else{
            await fetchTasks(user?.data.id_user)
        }
    }, 500)   

    const handleSearchByTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        if (user?.data.id_user) {
            debouncedSearch(user.data.id_user, value)
        }
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
        handleSearchByTitle,
        filterOption,

        getFieldsError,
        clearFieldsError
    })    
}