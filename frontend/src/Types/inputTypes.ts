export type FormInputProps = {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setError?: (msg: string) => void
    error?: string | null
    className?: string,
    suggestions?: React.ReactElement[]
}

export type PasswordInputProps = {
    placeholder: string
    name?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setError?: (msg: string) => void
    error?: string | null
    visible: boolean
    onToggleVisibility: (e: React.MouseEvent<HTMLDivElement>) => void
    className?: string
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}