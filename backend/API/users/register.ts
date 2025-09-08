import pool from '../../database/connection';
import { Router } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { hashPassword } from '../../utils/hashPassword';
import { sendError, sendSucess } from '../../utils/responseHandler';
import { registerQueries } from '../../SQL/Auth/registerQueries';
import { GetUserType } from '../../types/usersTypes';


const router = Router()

router.post('/register', async (req, res) => {
    try{
        const {firstname, lastname, username, email, user_password} = req.body;
        //Ingresar contraseña ya hasheada la base de datos
        const hashedPassword = await hashPassword(user_password);
        const [register] = await pool.query<ResultSetHeader>(registerQueries.registerUserQuery, [
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

router.get('/register/search-user', async(req, res) => {
    try{
        const {username} = req.query 

        const [users] = await pool.query<GetUserType[]>(registerQueries.validateUser, [`%${username}%`]);

        if(users.length > 0 ){
            return sendSucess(res, 200, users, "Usuarios encontrados.");
        }else
        {
            return sendSucess(res, 200, [], "Usuario disponible.")
        }
    }catch{
        return sendError(res, 500, "Error en el servidor.")
    }
})

export default router;