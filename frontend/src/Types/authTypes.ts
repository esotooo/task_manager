export type LoginType = {
    loginInput: string
    user_password: string
}

export type InformationReceivedType ={
    id_user: number,
    firstname: string,
    lastname: string,
    email: string,
    username: string
}

export type RegisterType = {
    firstname: string, 
    lastname: string, 
    username: string, 
    email: string, 
    user_password: string
}

export type ExistingUsernamesType = {
    username: string[]
}