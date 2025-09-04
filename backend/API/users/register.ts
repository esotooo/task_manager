import pool from '../../database/connection';
import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';
import { usersQueries } from '../../SQL/usersQueries';
import { hashPassword } from '../../utils/hashPassword';
import { sendError, sendSucess } from '../../utils/responseHandler';


const router = Router()

router.post('/register', async (req, res) => {
    try{
        const {firstname, lastname, username, email, user_password} = req.body;
        //Ingresar contraseña ya hasheada la base de datos
        const hashedPassword = await hashPassword(user_password);
        const [register] = await pool.query<ResultSetHeader>(usersQueries.registerQuery, [
            firstname, lastname, username, email, hashedPassword
        ])

        if(register.affectedRows > 0){
            const newUser = {
                id_user: register.insertId,
                firstname: firstname,
                lastname: lastname, 
                username: username, 
                user_password: hashedPassword
            }
            return sendSucess(res, 201, newUser, "Se ha registro el usuario exitosamente.");
        }
        else{
            return sendError(res, 400, "No se puedo registrar correctamente. Porfavor intente de nuevo.");
        }
    }catch{
        return sendError(res, 500, "Error en el servidor.");
    }
})

export default router;