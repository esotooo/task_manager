import { create } from 'zustand';
import { api } from '../Utils/axiosInstance.ts';

type TaskType = {
    id_task: number
    task_title: string
    task_description: string
    priority: string
    state: string 
    due_date: string
    create_date: string
    end_date: string
    id_user: number
}

type FormType= {
    id_task: number | null
    task_title: string | null
    task_description: string | null
    id_priority: number
    due_date: string | null 
    id_user: number | null
    end_date?: string | null
}

type TaskStatesType = {
    id_state: number,
    state: string
}

type TaskPrioritiesType = {
    id_priority: number
    priority: string
}

const initialFormState : FormType = {
    id_task: null,
    task_title: '',
    task_description: '',
    id_priority: 0, 
    due_date: null,
    id_user: null,
    end_date: null
}

type State = {
    isOpen: boolean
    message: string
    form: FormType
    tasks: TaskType[]
    states: TaskStatesType[]
    priorities: TaskPrioritiesType[]
}

type Actions = {
    openForm: () => void
    closeForm: () => void
    updateForm: (field: keyof FormType, value: string | number) => void;
    resetForm: () => void
    
    fetchTasks: (id_user: number) => Promise<void>
    createTask: (form: FormType) => Promise<void>
    updateTask: (form: FormType) => Promise<void>
    deleteTask: (id_task: number, id_user: number) => Promise<void>
    fetchPriorities: () => Promise<void>
    fetchStates: () => Promise<void>
}

export const useTaskStore = create<State & Actions>((set) => ({
    isOpen: false,
    form: initialFormState,
    tasks: [],
    message: '',
    states: [],
    priorities: [],

    openForm: () => set({isOpen: true}),
    closeForm: () => set({isOpen: false}),
    resetForm: () => set({form: initialFormState}),
    updateForm: (field, value) =>
        set((state) => ({ form: { ...state.form, [field]: value } })),

    //CRUD
    fetchTasks: async (id_user) => {
        try{
            const res = await api.get(`/api/tasks/get-tasks?id_user=${id_user}`)
            if(res.data === 200){
                set({tasks: res.data.data})
            }
        }catch(error : any){
            if(error.response){
                set({message: error?.response?.message})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
            }
        }
    },

    createTask: async (form) => {
        try{
            const res = await api.post(`/api/tasks/create-task`, form)
            if(res.status === 201){
                set((state) => ({ tasks: [...state.tasks, res.data.data] }));
            }
        }catch(error : any){
            if(error.response){
                set({message: error.response.message})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
            }
        }
    },

    updateTask: async (form) => {
        try{
            const res = await api.post(`/api/tasks/update-task/${form.id_task}/${form.id_user}`, form)
            if(res.status === 200){
                set((state) => ({
                    tasks: state.tasks.map((t) => 
                        t.id_task === form.id_task && t.id_task === form.id_user ? 
                        {...t, ...res.data.data} : t
                    )
                }))
            }
        }catch(error : any){
            if(error.response){
                set({message: error.response.message})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
            }
        }
    },

    deleteTask: async (id_task, id_user) => {
        try{
            const res = await api.delete(`/api/tasks/delete-task/${id_task}/${id_user}`)
            if (res.status === 200) {
                set((state) => ({
                    tasks: state.tasks.filter(
                        (t) => t.id_task !== id_task || t.id_user !== id_user
                    ),
                }));
            }
        }catch(error : any){
            if(error.response){
                set({message: error.response.message})
            }else{
                set({message: 'Error en la conexión con el servidor.'})
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
