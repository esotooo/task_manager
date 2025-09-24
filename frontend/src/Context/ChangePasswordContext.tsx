import { createContext} from 'react'
import { useState } from "react"
import { api } from '../Utils/axiosInstance.ts'
import { useInputError } from '../Hooks/Layout/useInputError.ts'

export const ChangePasswordContext = createContext<any>(null)

export const ChangePasswordProvider = ({ children }: { children: React.ReactNode }) => {


  const {getFieldsError, clearFieldsError, setFieldMessage } = useInputError();

  const [form, setForm] = useState({
    email: '',
    otp: ''
  })

  const initialForm = {
    email: '',
    otp: ''
  }


  const [error, setError] = useState('')
  const [step, setStep] = useState<'email' | 'otp' | 'change'>('email')
  const [showRegisterBtn, setShowRegisterBtn] = useState(false)
  
  const sendOTP = async (email: string) => {
      try{
          const res = await api.post('/api/users/send-otp', {email})
          if(res.status === 200){
              setStep('otp')
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
            setShowRegisterBtn(true)
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

  const backToEmail = () => {
    setStep('email')
    setError('')
    setForm(initialForm)
  }

  const backToVerify = () => {
    setStep('otp')
    setError('')
    setForm(prev => ({
      ...prev,
      otp: ''
    }))
  }


  return(
    <ChangePasswordContext.Provider value={{
      form, error, step, showRegisterBtn, setStep, handleChange, handleSendOTP, getFieldsError, clearFieldsError, 
      handleVerifyOTP, backToEmail, backToVerify,
      
    }}>
      {children}
    </ChangePasswordContext.Provider>
  )
}