export type RegisterActions = 
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "SET_ERROR"; message: string | null }
    | { type: "SET_CONFIRM"; message: string | null }
    | { type: "CLEAR_FORM" }
    | { type: "SET_SUGGESTIONS"; suggestions: string[] }

export type RegisterState = {
    form: {
        firstname: string
        lastname: string
        username: string
        email: string
        user_password: string
        confirm_password: string
        }
    message: string | null
    showError: boolean
    showConfirm: boolean
    suggestions: string[]
}

export const initialState : RegisterState = {
    form: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        user_password: "",
        confirm_password: "",
    },
    message: null,
    showError: false,
    showConfirm: false,
    suggestions: [],
}


export const RegisterReducer = (
    state: RegisterState,
    action: RegisterActions
) : RegisterState => {
    switch(action.type){
        case 'SET_FIELD':
            return{
                ...state,
                form: {...state.form, [action.field]: action.value}
            }
        case 'SET_ERROR':
            return{
                ...state,
                message: action.message, 
                showError: !!action.message,
                showConfirm: false
            }
        case 'SET_CONFIRM':
            return{
                ...state,
                message: action.message,
                showError: false,
                showConfirm: !!action.message
            }
        case 'CLEAR_FORM':
            return{
                ...state,
                form: initialState.form
            }
        case 'SET_SUGGESTIONS':
            return{
                ...state,
                suggestions: action.suggestions
            }
        default:
            return state
    }
}