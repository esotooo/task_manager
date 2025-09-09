import { RowDataPacket } from "mysql2";

export interface LoginType extends RowDataPacket{
    id_user: number, 
    firstname: string, 
    lastname: string,
}

export interface GetUsernameType extends RowDataPacket{
    username: string
}

export interface GetEmailType extends RowDataPacket{
    email: string
}