import type { LoginType } from "../Types/authTypes";

export type AuthActions = 
    {type: 'show-message', payload: {message: string}} |
    {type: 'close-message', payload: {message: string}} |
    {type: 'login', payload: {login: LoginType}} | 
    {type: 'logout'} 


export type AuthState = {
    message: string,
    login: LoginType | null,
}  

export const initialAuthState : AuthState = {
    message: '',
    login: null,
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

        default:
            return state
    }
}
