import pool from '../../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { sendError, sendSucess } from '../../utils/responseHandler';
import { usersQueries } from '../../SQL/Auth/usersQueries';
import { LoginType } from '../../types/usersTypes';
import dotenv from 'dotenv'

const router = Router();
dotenv.config()

router.post('/login', async (req, res) => {
    try{
        const {email, user_password, username} = req.body;

        if (!email && !username && !user_password) {
            return sendError(res, 400, "Por favor complete todos los campos.");
        } 
        if (!email && !username) {
            return sendError(res, 400, "Por favor ingrese su correo electrónico o usuario.");
        } 
        if (!user_password) {
            return sendError(res, 400, "Por favor ingrese su contraseña.");
        }
        
        let query: string;
        let param: string;

        //Elegir porque tipo de dato el usuario desea ingresar
        if(email){
            query = usersQueries.loginByEmailQuery;
            param = email;
        }else{
            query = usersQueries.loginByUsernameQuery;
            param = username;
        }


        const [rows] = await pool.query<LoginType[]>(query, [param]);
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

        return sendSucess(res, 200, {
            id_user: user.id_user,
            firstname: user.firstname,
            lastname: user.lastname,
        }, "Sesión iniciada exitosamente.", token)


    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
})

export default router;
