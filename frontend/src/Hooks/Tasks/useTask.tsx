import { useAuth } from "../Auth/useAuth"
import { useTaskStore, ValidationError } from "../../Store/useTaskStore"
import React, { useEffect, useRef } from "react"
import {toast} from 'react-hot-toast'
import { useInputError } from "../Layout/useInputError"
import debounce from 'debounce'

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
        setRangeDates
    } = useTaskStore();

    function formatDateForAPI(date: Date | null) {
        if (!date) return undefined;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    
    const {setFieldMessage, clearFieldsError, getFieldsError} = useInputError()

    const optionsList = useRef<HTMLDivElement | null>(null) //para lista de opciones de cada tarea
    const filters = useRef<HTMLDivElement>(null) //para los diferentes filtros

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

    const debouncedSearch = debounce(async (selectedOption) => {

        const start_date = formatDateForAPI(rangeDates[0]);
        const end_date = formatDateForAPI(rangeDates[1]);       

        if(user?.data.id_user === null) return

        await searchTasks({
            id_user: user?.data.id_user,
            task_title: selectedOption.task_title,
            id_priority: selectedOption.id_priority,
            id_state: selectedOption.id_state,
            range: {
                start_date,
                end_date
            }
        })
    }, 500)
    
    const handleSearch = async () => {
        const value = selectedOption
        debouncedSearch(value)
    }

    const handleFilterClick = (type: string, value: any, label: string = '') => {
        switch (type) {
            case 'priority':
                setSelectedOption({
                    ...selectedOption,
                    priority: label,
                    id_priority: value
                })
                break
            case 'state':
                setSelectedOption({
                    ...selectedOption,
                    state: label,
                    id_state: value
                })
                break
            case 'task_title':
                setSelectedOption({
                    ...selectedOption,
                    task_title: value
                })
                break
            case 'range': {
                const [start, end] = value || []
                const start_date = start ? new Date(start).toISOString().split('T')[0] : undefined
                const end_date = end ? new Date(end).toISOString().split('T')[0] : undefined
                setSelectedOption({
                    ...selectedOption,
                    range: { start_date, end_date }
                })
                handleSearch()
                break
            }
            default:
                break
        }
    }

    const handleCalendarChange = (value: [Date, Date] | Date) => {
        if (Array.isArray(value)) {
            const start = formatDateForAPI(value[0]);
            const end = value[1] ? formatDateForAPI(value[1]) : undefined;
            
        
            setRangeDates([value[0] || null, value[1] || null])
    
            setSelectedOption({
                ...selectedOption,
                range: { start_date: start, end_date: end }
            })
    
            handleSearch()
        } else {
            const start = value.toISOString().split("T")[0]
    
            setRangeDates([value, null])
    
            setSelectedOption({
                ...selectedOption,
                range: { start_date: start, end_date: null }
            })
    
            handleSearch()
        }
    }

    const handleNoLimit = () => {
        const start = rangeDates[0] || (selectedOption.range?.start_date ? new Date(selectedOption.range.start_date) : null)
        
        if (!start) return
    
        const formattedStart = formatDateForAPI(start)
    
        setRangeDates([start, null])
        setSelectedOption({
            ...selectedOption,
            range: { start_date: formattedStart, end_date: null }
        })
    
        setTimeout(() => {
            if (user?.data.id_user) handleSearch()
        }, 0)
    }
    
    const handleCancelDateFilter = (e: React.MouseEvent) => {
        e.stopPropagation()
        setRangeDates([null, null])
        setSelectedOption({
            ...selectedOption,
            range: { start_date: null, end_date: null }
        })
        setTimeout(() => {
            if (user?.data.id_user) handleSearch()
        }, 0)
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
      
        if (user?.data.id_user) {
          fetchTasks(user.data.id_user)
        }
    }, [fetchPriorities, fetchStates, user?.data.id_user])
      

    useEffect(() => {
        if (
            selectedOption.task_title ||
            selectedOption.id_priority ||
            selectedOption.id_state ||
            selectedOption.range?.start_date ||
            selectedOption.range?.end_date
        ) {
            handleSearch()
        }else{
            handleSearch()
        }
    }, [
        selectedOption.task_title,
        selectedOption.id_priority,
        selectedOption.id_state,
        selectedOption.range?.start_date,
        selectedOption.range?.end_date
    ])
    
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
        rangeDates,

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
        handleFilterClick,

        handleCalendarChange,
        handleCancelDateFilter,
        handleNoLimit

    })    
}