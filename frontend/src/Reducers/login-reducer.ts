export type LoginActions = 
    | {type: 'SET_FIELD'; field: string; value: string}
    | {type: 'SET_ERROR'; message: string | null}
    | {type: 'CLEAR_FIELDS'}
    | {type: 'CLEAR_ERROR'}

export type LoginState = {
    form: {
        email: string,
        user_password: string
    }
    showError: boolean
    message: string | null
}

export const initialState : LoginState = {
    form: {
        email: '',
        user_password: ''
    },
    showError: false,
    message: null,
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
        case 'SET_ERROR':
            return{
                ...state,
                message: action.message, 
                showError: !!action.message,
            }
        case 'CLEAR_ERROR':
            return{
                ...state,
                message: '',
                showError: false
            }
        case 'CLEAR_FIELDS':
            return{
                ...state,
                form: initialState.form
            }
        default:
            return state
    }
}