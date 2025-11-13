import Router from 'express';
import pool from '../../database/connection';
import { RowDataPacket } from 'mysql2';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { calendarQueries } from '../../Queries/Calendar/calendarQueries';

const router = Router();

router.get('/get-by-due_date', async (req, res) => {
    try{
        const {id_user} = req.query;

        const [tasks] = await pool.query<RowDataPacket[]>(calendarQueries.obtainByDueDate, id_user);

        if(tasks.length === 0){
            return sendError(res, 400, 'Aún no hay tareas creadas.');
        }   
            
        return sendSuccess(res, 200, tasks, 'Tareas obtenidas correctamente.');
    }catch{
        return sendError(res, 500, 'Error en el servidor.');
    }
});

router.get('/get-by-create_date', async(req, res) => {
    try{
        const {id_user} = req.query;

        const [tasks] = await pool.query<RowDataPacket[]>(calendarQueries.obtainByCreateDate, id_user);
        
        if(tasks.length === 0){
            return sendError(res, 400, 'Aún no hay tareas creadas.');
        }

        return sendSuccess(res, 200, tasks, 'Tareas obtenidas correctamente.');
    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
});

export default router;