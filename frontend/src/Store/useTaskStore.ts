import { create } from 'zustand';
import { api } from '../Utils/axiosInstance.ts';
import type { FormType, TaskType, TaskStatesType, TaskPrioritiesType, ConfirmDeleteType, SearchOptionsType } from '../Types/Tasks/TaskTypes.ts';

//Al igual esto, pasarlo a utilites y un archivo llamada Functions o algo asi
export class ValidationError extends Error {
    fields: Record<string, string>;
    constructor(fields: Record<string, string>) {
      super('Errores de validación');
      this.name = 'ValidationError';
      this.fields = fields;
    }
}

//Separar a utilities
export function formatDateForInput(dateStr: string | null) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
}

const initialFormState : FormType = {
    id_task: null,
    task_title: '',
    task_description: '',
    id_priority: null, 
    id_state: null,
    due_date: null,
    id_user: null,
    end_date: null,
}

const InitialSearchOptions : SearchOptionsType = {
    id_user: null,
    task_title: '',
    id_priority: null,
    id_state: null,
    end_date:  null,
    start_date: null
}

type State = {
    isOpen: boolean
    message: string
    form: FormType
    tasks: TaskType[]
    states: TaskStatesType[]
    priorities: TaskPrioritiesType[]
    isEditing: boolean
    openRowId: number | null
    confirmDelete: ConfirmDeleteType
    isViewing: boolean
    optionId: number | null
    selectedOption: SearchOptionsType
    rangeDates: [Date | null, Date | null]
}


type Actions = {
    openForm: () => void
    closeForm: () => void
    openWindow: (id_task: number) => void
    closeWindow: () => void
    updateForm: (field: keyof FormType, value: string | number | null) => void;
    resetForm: () => void
    
    toggleRow: (id: number) => void
    filterOption: (id: number) => void,

    editTask: (id_task: number, id_user: number) => void
    seeTask: (id_task: number, id_user: number) => void

    fetchTasks: (id_user: number) => Promise<void>
    searchTasks: (option: SearchOptionsType) => Promise<void>
    createTask: (form: FormType) => Promise<string>
    updateTask: (form: FormType) => Promise<string>
    deleteTask: (id_task: number, id_user: number) => Promise<string>
    fetchPriorities: () => Promise<void>
    fetchStates: () => Promise<void>

    setSelectedOption: (update: Partial<SearchOptionsType>) => void
    setRangeDates: (range: [Date | null, Date | null]) => void
}

export const useTaskStore = create<State & Actions>((set, get) => ({
    isOpen: false,
    form: initialFormState,
    tasks: [],
    message: '',
    states: [],
    priorities: [],
    isEditing: false,
    openRowId: null,
    confirmDelete: {
        open: false,
        id_task: null
    },
    isViewing: false,
    optionId: null,
    selectedOption: InitialSearchOptions,
    rangeDates: [null, null],

    openForm: () => set({isOpen: true}),
    closeForm: () => set({isOpen: false, isEditing: false, openRowId: null, isViewing: false}),
    setSelectedOption: (update: Partial<SearchOptionsType>) => 
        set((state) => ({ selectedOption: { ...state.selectedOption, ...update } })),
    setRangeDates: () => set({rangeDates: [null, null]}),
    openWindow: (id_task: number) => set({ confirmDelete: { open: true, id_task: id_task } }),
    closeWindow: () => set({ confirmDelete: { open: false, id_task: null } }),
    resetForm: () => set({form: initialFormState}),
    updateForm: (field, value) =>
        set((state) => ({ form: { ...state.form, [field]: value } })),

    toggleRow: (id: number) => {
        const { openRowId } = get()
        set({ openRowId: openRowId === id ? null : id });
    },

    filterOption: (id: number) => {
        const {optionId} = get()
        set({optionId: optionId === id  ? null : id});
    },

    editTask: (id_task: number, id_user: number) => {
        const { tasks } = get()
        const taskToEdit = tasks.find(
            (t) => t.id_task === id_task && t.id_user === id_user
        )
          
        if (taskToEdit) {
            set({
                form: {
                    id_task: taskToEdit.id_task,
                    task_title: taskToEdit.task_title,
                    task_description: taskToEdit.task_description,
                    id_priority: taskToEdit.id_priority ?? null,
                    id_state: taskToEdit.id_state ?? null,
                    due_date: formatDateForInput(taskToEdit.due_date),
                    id_user: taskToEdit.id_user,
                    end_date: formatDateForInput(taskToEdit.end_date)
                },
                isEditing: true,
                isOpen: true
            })
        }
    },

    seeTask: (id_task: number, id_user: number) => {
        const { tasks } = get();
        const taskToView = tasks.find(
            (t) => t.id_task === id_task && t.id_user === id_user
        )

        if (taskToView) {
            set({
                form: {
                    id_task: taskToView.id_task,
                    task_title: taskToView.task_title,
                    task_description: taskToView.task_description,
                    id_priority: taskToView.id_priority ?? null,
                    id_state: taskToView.id_state ?? null,
                    due_date: formatDateForInput(taskToView.due_date),
                    id_user: taskToView.id_user,
                    end_date: formatDateForInput(taskToView.end_date)
                },
                isViewing: true,
                isOpen: true
            })
        }
    },
    
    
    //CRUD
    fetchTasks: async (id_user) => {
        try{
            const res = await api.get(`/api/tasks/get-tasks?id_user=${id_user}`)
            if(res.status === 200){
                set({tasks: res.data.data})
            }
        }catch(error : any){
            if(error.response){
                set({message: error?.response?.data.message})
                set({tasks: []})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
                set({tasks: []})
            }
        }
    },

    searchTasks: async (selectedOption) => {
        try{
            
            const queryParams = new URLSearchParams()

            if(selectedOption.task_title) queryParams.append('task_title', selectedOption.task_title)
            if(selectedOption.id_priority) queryParams.append('id_priority', selectedOption.id_priority.toString())
            if(selectedOption.id_state) queryParams.append('id_state', selectedOption.id_state.toString())
            if(selectedOption.start_date) queryParams.append('start_date', selectedOption.start_date)
            if(selectedOption.end_date) queryParams.append('end_date', selectedOption.end_date)

            const res = await api.get(`/api/tasks/search-tasks?id_user=${selectedOption.id_user}&${queryParams.toString()}`)

            if(res.status === 200) set({tasks: res.data.data})

        }catch(error: any){
            if(error.response){
                set({message: error?.response?.data.message})
                set({tasks: []})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
                set({tasks: []})
            }
        }
    },

    createTask: async (form) => {
        try{
            const res = await api.post(`/api/tasks/create-task`, form)
            if(res.status === 201){
                set((state) => ({ tasks: [...state.tasks, res.data.data] }));
                return res.data.message
            }
        }catch(error : any){
            if(error.response){
                if(error.response.data.fields){
                    throw new ValidationError(error.response.data.fields)
                }else if(error.response.data.message){
                    throw new Error(error.response.data.message);
                }
            }else{
                throw new Error('Error en la conexión con el servidor.');
            }
        }
    },

    updateTask: async (form) => {
        try{
            const res = await api.put(`/api/tasks/update-task`, form)
            if(res.status === 200){
                set((state) => ({
                    tasks: state.tasks.map((t) => 
                        t.id_task === form.id_task && t.id_user === form.id_user ? 
                        {...t, ...res.data.data} : t
                    ),
                    openRowId: null 
                }))
                return res.data.message
            }
            
        }catch(error : any){
            if(error.response){
                if(error.response.data.fields){
                    throw new ValidationError(error.response.data.fields)
                }else if(error.response.data.message){
                    throw new Error(error.response.data.message)
                }
            }else{
                throw new Error('Error en la conexión con el servidor.');
            }
        }
    },

    deleteTask: async (id_task, id_user) => {
        try{
            const res = await api.delete(`/api/tasks/delete-task?id_task=${id_task}&id_user=${id_user}`)
            if (res.status === 200) {
                set((state) => ({
                    tasks: state.tasks.filter(
                        (t) => t.id_task !== id_task || t.id_user !== id_user
                    ),
                }))
                return res.data.message
            }
        }catch(error : any){
            if(error.response){
                throw new Error(error.response.data.message)
            }else{
                throw new Error('Error en la conexión con el servidor.');
            }
        }
    },

    fetchPriorities: async() => {
        try{
            const res = await api.get(`/api/tasks/get-priorities`)
            if(res.status === 200){
                set({priorities: res.data.data})
            }
        }catch{
            set({message: ''})
        }
    },

    fetchStates: async() => {
        try{
            const res = await api.get(`/api/tasks/get-states`)
            if(res.status === 200){
                set({states: res.data.data})
            }
        }catch{
            set({message: ''})
        }
    }      
}))