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
    id_state: number
    id_priority: number
}

type FormType= {
    id_task: number | null
    task_title: string | null
    task_description: string | null
    id_priority: number | null
    id_state: number | null
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
    id_priority: null, 
    id_state: null,
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
    isEditing: boolean
    openRowId: number | null
}

type Actions = {
    openForm: () => void
    closeForm: () => void
    updateForm: (field: keyof FormType, value: string | number | null) => void;
    resetForm: () => void
    
    toggleRow: (id: number) => void

    editTask: (id_task: number, id_user: number) => void

    fetchTasks: (id_user: number) => Promise<void>
    createTask: (form: FormType) => Promise<string>
    updateTask: (form: FormType) => Promise<string>
    deleteTask: (id_task: number, id_user: number) => Promise<string>
    fetchPriorities: () => Promise<void>
    fetchStates: () => Promise<void>
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

    openForm: () => set({isOpen: true}),
    closeForm: () => set({isOpen: false, isEditing: false, openRowId: null}),
    resetForm: () => set({form: initialFormState}),
    updateForm: (field, value) =>
        set((state) => ({ form: { ...state.form, [field]: value } })),

    toggleRow: (id: number) => {
        const { openRowId } = get();
        set({ openRowId: openRowId === id ? null : id });
    },

    editTask: (id_task: number, id_user: number) => {
        const { tasks } = get();
        const taskToEdit = tasks.find(
            (t) => t.id_task === id_task && t.id_user === id_user
        );

        function formatDateForInput(dateStr: string | null) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; 
        }
          
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
    
    //CRUD
    fetchTasks: async (id_user) => {
        try{
            const res = await api.get(`/api/tasks/get-tasks?id_user=${id_user}`)
            if(res.status === 200){
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
                return res.data.message
            }
        }catch(error : any){
            if(error.response){
                throw new Error(error.response.data.message);
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
                        t.id_task === form.id_task && t.id_task === form.id_user ? 
                        {...t, ...res.data.data} : t
                    ),
                    openRowId: null 
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

    deleteTask: async (id_task, id_user) => {
        try{
            const res = await api.delete(`/api/tasks/delete-task/${id_task}/${id_user}`)
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
