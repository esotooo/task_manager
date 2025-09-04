import { RowDataPacket } from "mysql2";

export interface LoginType extends RowDataPacket{
    id_user: number, 
    firstname: string, 
    lastname: string,
}

