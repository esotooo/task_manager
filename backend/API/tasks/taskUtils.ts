import { Router } from "express";
import { Request, Response } from "express";
import pool from '../../database/connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { sendError, sendSuccess } from "../../utils/responseHandler";
import { utilsQueries } from "../../Queries/Tasks/utilsQueries";
import { validateToken } from "../../middlewares/validateToken";

const router = Router();

router.get('/get-priorities', validateToken, async (req: Request, res: Response) => {
    try{
        const [data] = await pool.query<RowDataPacket[]>(utilsQueries.getPriorities);
        if(data.length === 0){
            return sendError(res, 400, "No se encontraron registros.");
        }
        return sendSuccess(res, 200, data, "Registros obtenidos exitosamente.");
    }catch{
        return sendError(res, 500, "Error en el servidor.");
    }
});

router.get('/get-states', validateToken,  async (req: Request, res: Response) => {
    try{
        const [data] = await pool.query<RowDataPacket[]>(utilsQueries.getStates);
        if(data.length === 0){
            return sendError(res, 400, "No se encontraron registros");
        }
        return sendSuccess(res, 200, data, "Registros obtenidos exitosamente.");
    }catch{
        return sendError(res, 500, "Error en el servidor.");
    }
});

export default router;