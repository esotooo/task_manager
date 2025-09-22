import { createContext} from 'react'
import { useState } from "react"
import { api } from '../Utils/axiosInstance.ts'

export const ChangePasswordContext = createContext<any>(null)

export const ChangePasswordProvider = ({ children }: { children: React.ReactNode }) => {

  const [form, setForm] = useState({
    email: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showOTPVerification, setShowOTPVerification] = useState(false)


  const sendOTP = async (email: string) => {
      try{
          const res = await api.post('/api/users/send-otp', {email})
          if(res.status === 200){
              setMessage(res.data.message)
              setTimeout(() => {
                  setMessage('')
                  setShowOTPVerification(true)
              }, 3000);
              return true 
          }
          return false
      }catch (error: any){
          if(error.response.data.message){
              setError(error.response.data.message)
          }else{
              setError('Error en la conexión con el servidor')
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


  return(
    <ChangePasswordContext.Provider value={{
      form, message, error, showOTPVerification, handleChange, handleSendOTP
    }}>
      {children}
    </ChangePasswordContext.Provider>
  )
}