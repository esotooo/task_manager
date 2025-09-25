import { createContext, useEffect} from 'react'
import { useState } from "react"
import { api } from '../Utils/axiosInstance.ts'
import { useInputError } from '../Hooks/Layout/useInputError.ts'
import { useNavigate } from 'react-router-dom'

export const ChangePasswordContext = createContext<any>(null)

export const ChangePasswordProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate()
    
  const {getFieldsError, clearFieldsError, setFieldMessage } = useInputError();

  const [form, setForm] = useState({
    email: '',
    otp: '',
    user_password: ''
  })

  const initialForm = {
    email: '',
    otp: '',
    user_password: ''
  }

  const [error, setError] = useState('')
  const [step, setStep] = useState<'email' | 'otp' | 'change'>('email')
  const [showButton, setShowButton] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const [showCounter, setShowCounter] = useState(true)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const sendOTP = async (email: string) => {
      try{
          const res = await api.post('/api/users/send-otp', {email})
          if(res.status === 200){
              setStep('otp')
              setTimeLeft(5 * 60)
              setIsCounting(true)
              setShowButton(false)
              setShowCounter(true)
              setError('')
              return true 
          }
          return false
      }catch (error: any){
        if(error.response){
          if(error.response.data.fields){
            setFieldMessage(error.response.data.fields)
          }
          if(error.response.status === 400){
            setError(error.response.data.message)
            setShowButton(true)
          }
          if(error.response.data.message){
              setError(error.response.data.message)
          }
        }else{
          setError('Error en la conexión con el servidor.')
        }
          return false
      }
  }

  const validateOTP = async (email: string, otp: string) => {
    try{
      const res = await api.post('/api/users/verify-otp', {email, otp})
      if(res.status === 200){
        setStep('change')
        setError('')
        setForm(prev => ({
          ...prev,
          otp: ''
      }))        
      return true
      }
      return false
    }catch(error:any){
      if(error.response){
        if(error.response.data.fields){
          setFieldMessage(error.response.data.fields)
        }
        if(error.response.data.message){
            setError(error.response.data.message)
        }
      }else{
        setError('Error en la conexión con el servidor.')
      }
      return false
    }
  }

  const changePassword = async (email: string, user_password: string) => {
    try{
      const res = await api.put('/api/users/change-password', {email, user_password})
      if(res.status === 200){
        setError('')
        setForm(initialForm)
        return true
      }
    }catch(error: any){
      if(error.response){
        if(error.response.data.fields){
          setFieldMessage(error.response.data.fields)
        }
        if(error.response.data.message){
          setError(error.response.data.message)
        }
      }else{
        setError('Error en la conexión con el servidor.')
      }
      return false
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      setForm(prev => ({
          ...prev,
          [name]: value
      }))
  }

  const handleSendOTP =  async (e: React.FormEvent) => {
      e.preventDefault()
      await sendOTP(form.email)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    await validateOTP(form.email, form.otp)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    await changePassword(form.email, form.user_password)
    navigate('/login', {replace: true})
  }


  const backToEmail = () => {
    setStep('email')
    setError('')
    setForm(initialForm)
    setIsCounting(false)
    setTimeLeft(0)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    if (!isCounting || timeLeft <= 0){
      setShowButton(true)
      setShowCounter(false)
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isCounting, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const resendOTP = async () => {
    await sendOTP(form.email);
  }

  const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.MouseEvent) => { e.preventDefault(); setter(prev => !prev) }

  const togglePasswordVisibility = toggleVisibility(setPasswordVisible)

  return(
    <ChangePasswordContext.Provider value={{
      form, error, step, showButton, setStep, handleChange, handleSendOTP, getFieldsError, clearFieldsError, 
      handleVerifyOTP, backToEmail, minutes, seconds, resendOTP, showCounter, handleChangePassword,
      passwordVisible,
      togglePasswordVisibility
    }}>
      {children}
    </ChangePasswordContext.Provider>
  )
}