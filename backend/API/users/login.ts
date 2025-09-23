import pool from '../../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { usersQueries } from '../../Queries/Auth/usersQueries';
import { LoginType } from '../../types/usersTypes';
import dotenv from 'dotenv'
import { validateLogin, handleLoginErrors } from '../../middlewares/validateLogin';
import { Request, Response } from 'express';

const router = Router();
dotenv.config()

router.post('/login', validateLogin, handleLoginErrors,  async (req: Request, res: Response) => {
    try{
        const {loginInput, user_password} = req.body;
        
        let query: string;

        //Elegir porque tipo de dato el usuario desea ingresar
        if(loginInput.includes('@')){
            query = usersQueries.loginByEmailQuery;
        }else{
            query = usersQueries.loginByUsernameQuery;
        }

        const [rows] = await pool.query<LoginType[]>(query, [loginInput]);
        if(rows.length === 0){
            return sendError(res, 401, "Correo y/o contraseña incorrectos. Por favor intente de nuevo.");
        }

        const user = rows[0]

        //Verificar que la contraseña coincida
        const isMatch = await bcrypt.compare(user_password, user.user_password)
        if(!isMatch){
            return sendError(res, 401, "Correo y/o contraseña incorrectos. Por favor intente de nuevo.");
        }

        //Generar token para usar opciones dentro de la aplicación
        const token = jwt.sign(
            {id: user.id_user, email: user.email},
            process.env.JWT_SECRET || 'defaultsecret',
            {expiresIn: '1h'}
        )

        return sendSuccess(res, 200, {
            id_user: user.id_user,
            firstname: user.firstname,
            lastname: user.lastname,
        }, "Sesión iniciada exitosamente.", token)


    }catch(error){
        return sendError(res, 500, 'Error en el servidor.')
    }
})

export default router;
