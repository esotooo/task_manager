import { RowDataPacket } from "mysql2";

export interface LoginType extends RowDataPacket{
    id_user: number, 
    firstname: string, 
    lastname: string,
    username: string,
    email: string
}

export interface GetUsernameType extends RowDataPacket{
    username: string
}

