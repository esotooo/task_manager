import type { LoginType } from "../Types/authTypes";

export type AuthActions = 
    {type: 'show-message', payload: {message: string}} |
    {type: 'close-message', payload: {message: string}} |
    {type: 'login', payload: {login: LoginType}} | 
    {type: 'logout'} |
    {type: 'show-field-error', payload: {error: string}} |
    {type: 'close-field-error', payload: {error: string}}


export type AuthState = {
    message: string,
    login: LoginType | null,
    fields: string
}  

export const initialAuthState : AuthState = {
    message: '',
    login: null,
    fields: ''
}

export const AuthReducer = (
    state: AuthState,
    action: AuthActions
) : AuthState => {
    switch(action.type){
        case 'show-message':
            return{
                ...state,
                message: action.payload.message
            }
        case 'close-message':
            return{
                ...state,
                message: ''
            }
        case 'login':
            return{
                ...state,
                login: action.payload.login,
                message: ''
            }
        case 'logout':
            return{
                ...state,
                login: null
            }
        case 'show-field-error':
            return{
                ...state,
                fields: action.payload.error
            }
        case 'close-field-error':
            return{
                ...state,
                fields: ''
            }
        default:
            return state
    }
}
