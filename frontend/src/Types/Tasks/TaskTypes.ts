export type TaskType = {
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

export type FormType= {
    id_task: number | null
    task_title: string | null
    task_description: string | null
    id_priority: number | null
    id_state: number | null
    due_date: string | null 
    id_user: number | null
    end_date?: string | null
}

export type TaskStatesType = {
    id_state: number,
    state: string
}

export type TaskPrioritiesType = {
    id_priority: number
    priority: string
}

export type SearchOptionsType = {
    id_user: number | null
    task_title?: string
    id_priority?: number | null
    priority?: string
    id_state?: number | null
    state?: string
    range?: {
        end_date?: string | null
        start_date?: string | null
    }
}

export type ConfirmDeleteType = {
    open: boolean
    id_task: number | null
}

