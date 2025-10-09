import { Router } from "express";
import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../database/connection';
import { createTaskQueries } from "../../Queries/Tasks/createTaskQueries";
import { sendError, sendSuccess } from "../../utils/responseHandler";

const router = Router();

export const taskID = [];

router.post('/create-task', async (req: Request, res: Response) => {
    try{
        const{
            task_title, 
            task_description, 
            id_priority,
            due_date, 
            id_user, 
        } = req.body

        const [rows] = await pool.query<RowDataPacket[]>(createTaskQueries.obtainTaskID, [id_user])

        const lastID = rows.length > 0 ? rows[0].id_task : 0
        const newId = lastID + 1;

        const initialTaskstate = 1;

        const create_date = new Date();

        const [create] = await pool.query<ResultSetHeader>(createTaskQueries.createTask, [
            newId, task_title, task_description, id_priority, initialTaskstate, due_date, id_user, create_date
        ]);

        if(create.affectedRows > 0){
            const newTask = {
                id_task: newId, 
                task_title,
                task_description,
                id_priority,
                id_state: initialTaskstate,
                due_date,
                id_user, 
                create_date
            }
            return sendSuccess(res, 201, newTask, 'Tarea creada exitosamente.');

        }
        else return sendError(res, 400, 'No se pudo crear la tarea.');

    }catch{
        return sendError(res, 500, 'Error interno en el servidor.');
    }
});


export default router;
