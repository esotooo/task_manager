import pool from '../../database/connection';
import { Router, Request, Response} from 'express';
import { ResultSetHeader } from 'mysql2';
import { hashPassword } from '../../utils/hashPassword';
import { sendError, sendSucess } from '../../utils/responseHandler';
import { registerQueries } from '../../SQL/Auth/registerQueries';
import { handleValidationErrors, validateUserRegister } from '../../middlewares/validateUserRegister';

const router = Router()

router.post('/register', validateUserRegister, handleValidationErrors, async (req: Request, res: Response) => {
    try{
        const {firstname, lastname, username, email, user_password} = req.body;

        //Ingresar contraseña ya hasheada la base de datos
        const hashedPassword = await hashPassword(user_password);
        const [register] = await pool.query<ResultSetHeader>(registerQueries.registerUserQuery, [
            firstname, lastname, username, email, hashedPassword
        ])

        //Proceder con el registro
        if(register.affectedRows > 0){
            const newUser = {
                id_user: register.insertId,
                firstname: firstname,
                lastname: lastname, 
                username: username, 
            }
            return sendSucess(res, 201, newUser, "Se ha registro el usuario exitosamente.");
        }
        else{
            return sendError(res, 400, "No se puedo registrar correctamente. Porfavor intente de nuevo.");
        }
    }catch(error){
        return sendError(res, 500, "Error en el servidor.", error);
    }
})

export default router;