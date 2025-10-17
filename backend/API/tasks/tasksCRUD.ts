import { Router } from "express";
import { Request, Response } from "express";
import { ResultSetHeader } from 'mysql2';
import pool from '../../database/connection';
import { CRUDqueries } from "../../Queries/Tasks/CRUDqueries";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { GetIDType, GetTaskType } from "../../types/TaskTypes";

const router = Router();

router.post('/create-task', async (req: Request, res: Response) => {
    try{
        const{
            task_title, 
            task_description, 
            id_priority,
            due_date, 
            id_user, 
        } = req.body

        const [rows] = await pool.query<GetIDType[]>(CRUDqueries.obtainTaskID, [id_user])

        const lastID = rows.length > 0 ? rows[0].id_task : 0
        const newId = lastID + 1;

        const initialTaskstate = 1;

        const create_date = new Date();

        const [create] = await pool.query<ResultSetHeader>(CRUDqueries.createTask, [
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


router.get('/get-tasks', async (req: Request, res: Response) => {
    try{
        const {id_user} = req.query;

        const [data] = await pool.query<GetTaskType[]>(CRUDqueries.getTasks, [id_user]);
    
        if(data.length === 0){
            return sendError(res, 400, 'Aún no cuentas con tareas creadas.');
        }
    
        return sendSuccess(res, 200, data, 'Tareas obtenidas correctamente.');
    }catch{
        return sendError(res, 500, 'Error en el servidor.');
    }
});

router.put('/update-task', async(req: Request, res:Response) => {
    try{
        const {
            task_title, 
            task_description,
            id_priority, 
            id_state, 
            due_date, 
            end_date, 
            id_task,
            id_user
        } = req.body;

        const [update] = await pool.query<ResultSetHeader>(CRUDqueries.updateTask, [
            task_title, task_description, id_priority, id_state, due_date, end_date, id_task, id_user
        ]);

        if (update.affectedRows === 0) {
            return sendError(res, 404, 'No se encontró la tarea para actualizar.');
        }

        return sendSuccess(res, 200, [], 'Tarea actualizada exitosamente.');

    }catch{
        return sendError(res, 500, 'Error en el servidor.');
    }
});

router.delete('/delete-task', async(req: Request, res:Response) => {
    try{
        const {id_task, id_user} = req.query;
        
        const [task] = await pool.query<ResultSetHeader>(CRUDqueries.deleteTask, [id_task, id_user]);

        if(task.affectedRows === 0 ) return sendError(res, 404, "No se encontro la tarea a eliminar.");

        return sendSuccess(res, 200, [], 'Tarea eliminada exitosamente.');
    }catch{
        return sendError(res, 500, 'Error en el servidor.');
    }
});

export default router;
