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
        
        const params: any[] = [id_user];
        const conditions: string[] = [];


        if (start_date && end_date){ // Buscar por un rango de fechas
            conditions.push(searchQueries.searchByDateRange);
            params.push(start_date, end_date);
        }
        else if (start_date){ // Fecha inicial
            conditions.push(searchQueries.searchByDateStart);
            params.push(start_date);
        }

        if(task_title){ // Titulo
            conditions.push(searchQueries.searchByTitle);
            params.push(`%${task_title}%`);
        }
   
        if(id_priority){ // Buscar por prioridad
            conditions.push(searchQueries.searchByPriority);
            params.push(id_priority);
        }

        if(id_state){ // Buscar por estado
            conditions.push(searchQueries.searchByState);
            params.push(id_state);
        }

        let query = searchQueries.baseQuery;
        if(conditions.length > 0){ //Realizar busqueda con diferentes parametros
            query += ' AND ' + conditions.join(' AND ');
        }
        
        const [tasks] = await pool.query<RowDataPacket[]>(query, params);
        if(tasks.length === 0){
            return sendError(res, 400 , 'No se encontro ninguna tarea.');
        }        

        return sendSuccess(res, 200, tasks);
    }
    catch(error){
        return sendError(res, 500, 'Error en el servidor.', error);
    }
});


export default router;
