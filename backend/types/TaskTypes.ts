import { RowDataPacket } from "mysql2";

export interface GetTaskType extends RowDataPacket {
    id_task: number, 
    task_title: string, 
    task_description: string, 
    priority: string, 
    state: string, 
    due_date: string, 
    create_date: string, 
    end_date: string
};

export interface GetIDType extends RowDataPacket{
    id_task: number
}