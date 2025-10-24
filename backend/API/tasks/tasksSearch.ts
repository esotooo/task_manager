import { Router } from "express";
import { Request, Response } from "express";
import pool from '../../database/connection';
import { validateToken } from "../../middlewares/validateToken";
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { RowDataPacket } from "mysql2";
import { searchQueries } from "../../Queries/Tasks/searchQueries";

const router = Router();

router.get('/search-by-title', async (req: Request, res: Response) => {
    try{
        const {id_user, task_title} = req.query;
        const [tasks] = await pool.query<RowDataPacket[]>(searchQueries.searchByTitle, [id_user, `%${task_title}%`]);

        if(tasks.length === 0){
            return sendError(res, 400, 'No se encontro ninguna tarea.')
        }

        return sendSuccess(res, 200, tasks)
        
    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
});

router.get('/search-by-date', async (req: Request, res: Response) => {
    try{
        const {id_user, start_date, end_date} = req.query;
        let query, params; 

        if(start_date){
            query = searchQueries.searchByDateStart;
            params = [id_user, start_date];
        }else{
            query = searchQueries.searchByDateRange;
            params = [id_user, start_date, end_date];
        }
        
        const [tasks] = await pool.query<RowDataPacket[]>(query, params);

        if(tasks.length === 0){
            return sendError(res, 400 , 'No se encontro ninguna tarea.')
        }

        return sendSuccess(res, 200, tasks)
    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
});


export default router;