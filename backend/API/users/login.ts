import pool from '../../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { loginQueries } from '../../Queries/Auth/loginQueries';
import { LoginType, VerificationType } from '../../types/usersTypes';
import { validateLogin, handleLoginErrors } from '../../middlewares/validateLogin';
import { Request, Response } from 'express';
import { validateSession } from '../../middlewares/validateSession';

const router = Router();

router.post('/login', validateLogin, handleLoginErrors,  async (req: Request, res: Response) => {
    try{
        const {email, user_password} = req.body;
        

        const [rows] = await pool.query<LoginType[]>(loginQueries.loginByEmailQuery, [email]);
        if(rows.length === 0){
            return sendError(res, 401, "Correo y/o contraseña incorrectos. Por favor intente de nuevo.");
        }

        const user = rows[0]

        //Verificar que la contraseña coincida
        const isMatch = await bcrypt.compare(user_password, user.user_password)
        if(!isMatch){
            return sendError(res, 401, "Correo y/o contraseña incorrectos. Por favor intente de nuevo.");
        }

        if(!user.is_valid){
            return sendError(res, 403, "Debes verificar tu cuenta antes de iniciar sesión.");
        }

        //Generar token para usar opciones dentro de la aplicación
        const token = jwt.sign(
            {id: user.id_user, email: user.email},
            process.env.JWT_SECRET || 'defaultsecret',
            {expiresIn: '7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'lax', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        

        return sendSuccess(res, 200, {
            id_user: user.id_user,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email
        }, "Sesión iniciada exitosamente.", token)


    }catch{
        return sendError(res, 500, 'Error en el servidor.')
    }
});

router.get("/active-session", validateSession, (req, res) => {
    return res.json({ success: true, user: (req as any).user });
})

router.post('/logout',(req ,res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, 
        sameSite: 'lax',
    });
    return res.json({ success: true, message: 'Sesión cerrada' });
})

export default router;