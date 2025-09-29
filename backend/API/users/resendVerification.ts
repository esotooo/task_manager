import pool from '../../database/connection';
import { Request, Response } from 'express';
import { Router } from 'express';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { validateEmailQueries } from '../../Queries/Auth/validateEmailQueries';
import { RowDataPacket } from 'mysql2';
import { generateVerificationToken } from '../../utils/generateVerificationToken';

const router = Router();

router.get('/resend-verification', async (req: Request, res:Response) => {
    try{
        const {email} = req.body;

        const emailNormalized = email.trim().toLowerCase();

        const [rows] = await pool.query<RowDataPacket[]>(validateEmailQueries.validateEmail, [emailNormalized]);
        if(rows.length === 0){
            return sendSuccess(res, 200, null, "Si el correo existe y no está verificado, se ha reenviado el link.");
        }

        const user = rows[0];

        if (user.is_valid) {
            return sendSuccess(res, 200, null, "El correo ya ha sido verificado.");
        }
        
        generateVerificationToken(emailNormalized);

        return sendSuccess(res, 200, null, "Si el correo existe y no está verificado, se ha reenviado el link.");

    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
});

export default router;