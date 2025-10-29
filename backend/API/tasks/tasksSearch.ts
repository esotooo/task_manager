import { Router } from "express";
import { Request, Response } from "express";
import pool from '../../database/connection';
import { validateToken } from "../../middlewares/validateToken";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { RowDataPacket } from "mysql2";
import { searchQueries } from "../../Queries/Tasks/searchQueries";

const router = Router();

router.get('/search-tasks', async(req: Request, res: Response) => {
    try{
        const {id_user, task_title, id_priority, id_state, start_date, end_date} = req.query;
        let query, params;

        if(task_title){
            query = searchQueries.searchByTitle;
            params = [id_user, `%${task_title}%`];
        }
        if (start_date){
            query = searchQueries.searchByDateStart;
            params = [id_user, start_date];
        }
        if (start_date && end_date){
            query = searchQueries.searchByDateRange;
            params = [id_user, start_date, end_date];
        }
        if(id_priority){
            query = searchQueries.searchByPriority;
            params = [id_user, id_priority];
        }
        if(id_state){
            query = searchQueries.searchByState;
            params = [id_user, id_state];
        }
        if(task_title && id_priority){
            query = searchQueries.searchByTitleAndPriority;
            params = [id_user, id_priority, `%${task_title}%`]
        }

        if (!query || !params) {
            return sendError(res, 400, 'Parámetros invalidos');
        }

        const [tasks] = await pool.query<RowDataPacket[]>(query, params);
        if(tasks.length === 0){
            return sendError(res, 400 , 'No se encontro ninguna tarea.');
        }        

        return sendSuccess(res, 200, tasks);
    }
    catch{
        return sendError(res, 500, 'Error en el servidor.');
    }
});


export default router;