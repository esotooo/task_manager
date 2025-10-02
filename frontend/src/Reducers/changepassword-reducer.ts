
export type ChangePasswordActions = 
   | {type: 'SET_FIELD'; field: string; value: string}
   | {type: 'SHOW_BUTTON'}
   | {type: 'HIDE_BUTTON'}
   | {type: 'START_COUNTER'}
   | {type: 'RESTART_COUNTER'}
   | {type: 'SET_STEP'; step: 'email' | 'otp' | 'change'}
   | {type: "SET_MESSAGE"; message: string | null; status: 'error' | 'success' | null} 
   | {type: "RESET_FORM"}
   | {type: "TICK_COUNTER"}
   | {type: 'SET_ERROR', message: string | null}
   | {type: 'SET_CONFIRM', message: string | null}

export type ChangePasswordState = {
    form: {
        email: string,
        otp: string,
        user_password: string
    }
    step: 'email' | 'otp' | 'change',
    otpTimer:{
        timeLeft: number, 
        isCounting: boolean, 
        showCounter: boolean,
        showButton: boolean,
    }
    message: string | null
    showMessage: boolean,
    status: 'error' | 'success' | null,
    showButton: boolean
    showError: boolean,
    showConfirm: boolean;
}

export const initialState: ChangePasswordState = {
    form: {
        email: '',
        otp: '',
        user_password: ''
    },
    step: 'email',
    otpTimer: {
        timeLeft: 0,
        isCounting: false,
        showCounter: false,
        showButton: false,
    },
    showButton: false,
    message: null,
    showMessage: false,
    status: null,
    showError: false,
    showConfirm: false,
}

export const ChangePasswordReducer = (
    state: ChangePasswordState,
    action: ChangePasswordActions
) : ChangePasswordState => {
    switch(action.type){
        case 'SET_FIELD':
            return{
                ...state, 
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        case 'START_COUNTER':
            return{
                ...state,
                otpTimer: {
                    timeLeft: 5 * 60,
                    isCounting: true,
                    showCounter: true,
                    showButton: false
                }
            }
        case 'RESTART_COUNTER':
            return{
                ...state,
                otpTimer: {
                    timeLeft: 0,
                    isCounting: false,
                    showCounter: false,
                    showButton: true
                }
            }
        case 'SET_STEP':
            return{
                ...state,
                step: action.step
            }
        case 'SET_MESSAGE':
            return{
                ...state,
                message: action.message,
                status: action.status,
                showMessage: !!action.message
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
        case 'RESET_FORM':
            return{
                ...state,
                form: initialState.form
            }
        case "TICK_COUNTER":
            return {
                ...state,
                otpTimer: {
                ...state.otpTimer,
                timeLeft: state.otpTimer.timeLeft - 1
                }
            }
        case 'SET_CONFIRM':
            return{
                ...state,
                message: action.message,
                showError: false,
                showConfirm: !!action.message
            }
        case 'SET_ERROR':
            return{
                ...state,
                message: action.message,
                showConfirm: false,
                showError: !!action.message
            }
            

        default:
            return state
    }
}