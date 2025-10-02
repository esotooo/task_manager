import { createContext, useEffect, useReducer, useRef} from 'react'
import { api } from '../Utils/axiosInstance.ts'
import { useInputError } from '../Hooks/Layout/useInputError.ts'
import { ChangePasswordReducer, initialState } from '../Reducers/changepassword-reducer.ts'
import { useNavigate } from 'react-router-dom'

export const ChangePasswordContext = createContext<any>(null)

export const ChangePasswordProvider = ({ children }: { children: React.ReactNode }) => {

  const {getFieldsError, clearFieldsError, setFieldMessage } = useInputError();

  const [state, dispatch] = useReducer(ChangePasswordReducer, initialState)

  const navigate = useNavigate()

  const container = useRef<HTMLDivElement>(null)
  
  const sendOTP = async (email: string) => {
      try{
          const res = await api.post('/api/users/send-otp', {email})
          if(res.status === 200){

              dispatch({type: 'START_COUNTER'})
              dispatch({type:'SET_MESSAGE', message: res.data.message, status: 'success'})
              setTimeout(() => {
                dispatch({type: 'SET_MESSAGE', message: '', status:  null})
                dispatch({type: 'SET_STEP', step: 'otp'})
              }, 3000)

              return true 
          }
          return false
      }catch (error: any){
        if(error.response){
          if(error.response.data.fields){
            setFieldMessage(error.response.data.fields)
          }
          if(error.response.status === 404){
            dispatch({type: 'SET_MESSAGE', message: error.response.data.message, status: 'error'})
            dispatch({type: 'SHOW_BUTTON'})
          }
          if(error.response.data.message){
            dispatch({type: 'SET_MESSAGE', message: error.response.data.message, status: 'error'})
          }
        }else{
          dispatch({type: 'SET_MESSAGE', message: 'Error en la conexión con el servidor.', status: 'error'})
        }
          return false
      }
  }

  const validateOTP = async (email: string, otp: string) => {
    try{
      const res = await api.post('/api/users/verify-otp', {email, otp})
      if(res.status === 200){
        dispatch({type: 'SET_FIELD', field: 'otp', value: ''}) 
        dispatch({type:'SET_MESSAGE', message: res.data.message, status: 'success'})
        setTimeout(() => {
          dispatch({type: 'SET_MESSAGE', message: '', status: null})
          dispatch({type: 'SET_STEP', step: 'change'})    
        }, 3000)   

        return true
      }
      return false
    }catch(error:any){
      if(error.response){
        if(error.response.data.fields){
          setFieldMessage(error.response.data.fields)
        }
        if(error.response.data.message){
          dispatch({type: 'SET_MESSAGE', message: error.response.data.message, status: 'error'})
        }
      }else{
        dispatch({type: 'SET_MESSAGE', message: 'Error en la conexión con el servidor.', status: 'error'})
      }
      return false
    }
  }

  const changePassword = async (email: string, user_password: string) => {
    try{
      const res = await api.put('/api/users/change-password', {email, user_password})
      if(res.status === 200){
        dispatch({type: 'RESET_FORM'})
        dispatch({type: 'SET_CONFIRM', message: res.data.message})
        setTimeout(() => {
          dispatch({type: 'SET_CONFIRM', message: ''})
          navigate('/login', {replace: true})

        }, 3000)   
        return true
      }
    }catch(error: any){
      if(error.response){
        if(error.response.data.fields){
          setFieldMessage(error.response.data.fields)
        }
        if(error.response.data.message){
          dispatch({type: 'SET_ERROR', message: error.response.data.message})
          setTimeout(() => {
            dispatch({type: 'SET_ERROR', message: ''})
          }, 3000);
        }
      }else{
        dispatch({type: 'SET_ERROR', message: 'Error en la conexión con el servidor.'})
        setTimeout(() => {
          dispatch({type: 'SET_ERROR', message: ''})
        }, 3000);      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: 'SET_FIELD', field: e.target.name, value: e.target.value})
  }

  const handleSendOTP =  async (e: React.FormEvent) => {
      e.preventDefault()
      await sendOTP(state.form.email)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    await validateOTP(state.form.email, state.form.otp)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    await changePassword(state.form.email, state.form.user_password)
  }

  const resendOTP = async () => {
    await sendOTP(state.form.email);
  }

  const backToEmail = () => {
    dispatch({type: 'SET_STEP', step: 'email'})
    dispatch({type: 'SET_MESSAGE', message: '', status: null})
    dispatch({type: 'RESET_FORM'})
    dispatch({type: 'RESTART_COUNTER'})
    setFieldMessage(null)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({type: 'TICK_COUNTER'})
    }, 1000)

    if (!state.otpTimer.isCounting || state.otpTimer.timeLeft <= 0){
      dispatch({ type: "RESTART_COUNTER" })
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [state.otpTimer.isCounting, state.otpTimer.timeLeft])

  const minutes = Math.floor(state.otpTimer.timeLeft / 60)
  const seconds = state.otpTimer.timeLeft % 60


  return(
    <ChangePasswordContext.Provider value={{
      state,
      minutes,
      seconds,
      container,
      handleChange, 
      handleSendOTP, 
      getFieldsError, 
      clearFieldsError, 
      handleVerifyOTP, 
      backToEmail,   
      resendOTP, 
      handleChangePassword,
    }}>
      {children}
    </ChangePasswordContext.Provider>
  )
}