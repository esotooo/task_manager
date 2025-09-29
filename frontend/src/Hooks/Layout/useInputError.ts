import { useState } from "react"

type FieldsErrors = {
  [key: string]: string 
}

export const useInputError = (initialErrors: FieldsErrors = {}) => {
  const [fieldMessage, setFieldMessage] = useState<FieldsErrors | null>(initialErrors)

  const getFieldsError = (fieldname: string) => {
    if (!fieldMessage) return null
    const fields = fieldMessage as unknown as FieldsErrors
    return fields[fieldname] || null
  }

  const clearFieldsError = (fieldName: string, msg: string) => {
    setFieldMessage(prev => ({ ...prev, [fieldName]: msg }))
  }


  return { fieldMessage, getFieldsError, clearFieldsError, setFieldMessage };
};
