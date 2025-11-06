export type FormInputProps = {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date'
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setError?: (msg: string) => void
    error?: string | null
    className?: string,
    suggestions?: React.ReactElement[]
    disabled?: boolean
}

export type TextAreaProps = {
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    setError?: (msg: string) => void
    error?: string | null
    className?: string,
    disabled?: boolean
}

export type SelectProps = {
    name: string
    value: number 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    setError?: (msg: string) => void
    error?: string | null
    className?: string,
    disabled?: boolean,
    options: {
        value: number
        label: string
    }[]
    placeholder: string
}

export interface PasswordRequirement {
    label: string;
    test: RegExp;
}
  
export type PasswordInputProps = {
    placeholder: string
    name?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setError?: (msg: string) => void
    error?: string | null
    className?: string
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void
    requirements?: PasswordRequirement[]
    showPasswordRequirements?: boolean,
}
