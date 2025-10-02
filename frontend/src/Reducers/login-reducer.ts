export type LoginActions = 
    | {type: 'SET_FIELD'; field: string; value: string}
    | {type: 'SET_MESSAGE'; message: string | null; status: 'error' | 'success' | null}
    | {type: 'CLEAR_FIELDS'}
    | {type: 'SHOW_BUTTON'}
    | {type: 'HIDE_BUTTON'}

export type LoginState = {
    form: {
        email: string
        user_password: string
    }
    showMessage: boolean
    message: string | null
    showButton: boolean
    status: 'error' | 'success' | null
}

export const initialState : LoginState = {
    form: {
        email: '',
        user_password: ''
    },
    showMessage: false,
    message: null,
    showButton: false,
    status: null
}

export const LoginReducer = (
    state: LoginState, 
    action: LoginActions
) : LoginState => {
    switch(action.type){
        case 'SET_FIELD':
            return{
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        case 'SET_MESSAGE':
            return{
                ...state,
                message: action.message, 
                status: action.status,
                showMessage: !!action.message
            }
        case 'CLEAR_FIELDS':
            return{
                ...state,
                form: initialState.form
            }
        case 'SHOW_BUTTON':
            return{
                ...state,
                showButton: true
            }
        case 'HIDE_BUTTON':
            return{
                ...state,
                showButton: false
            }
            
        default:
            return state
    }
}