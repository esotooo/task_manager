import pool from '../../database/connection';
import { Router, Request, Response} from 'express';
import { ResultSetHeader } from 'mysql2';
import { hashPassword } from '../../utils/hashPassword';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { registerQueries } from '../../Queries/Auth/registerQueries';
import { handleValidationErrorsByField, validateUserRegister } from '../../middlewares/validateUserRegister';
import { GetUsernameType } from '../../types/usersTypes';
import { generateUsernames } from '../../utils/generateUsernames';
import { tokenStore } from '../../utils/generateVerificationToken';
import { generateVerificationToken } from '../../utils/generateVerificationToken';

const router = Router();

router.post('/register', validateUserRegister, handleValidationErrorsByField, async (req: Request, res: Response) => {
    try{
        const {firstname, lastname, username, email, user_password} = req.body;

        const emailNormalized = email.trim().toLowerCase();

        //Ingresar contraseña ya hasheada la base de datos
        const hashedPassword = await hashPassword(user_password);
        const [register] = await pool.query<ResultSetHeader>(registerQueries.registerUserQuery, [
            firstname, lastname, username, emailNormalized, hashedPassword, false
        ]);
        
        //Proceder con el registro
        if(register.affectedRows > 0){
            generateVerificationToken(emailNormalized)

            const newUser = {
                id_user: register.insertId,
                firstname: firstname,
                lastname: lastname, 
                username: username, 
            }
            return sendSuccess(res, 201, newUser, `El usuario se ha registrado exitosamente. Se ha enviado un correo al email 
                proporcionado para validar la cuenta.`);
        }
        else{
            return sendError(res, 400, "No se puedo registrar correctamente. Porfavor intente de nuevo.");
        }
    }catch(error){
        return sendError(res, 500, "Error en el servidor.");
    }
});

router.get('/search-username', async(req: Request, res: Response) => {
    try{
        const {username}  = req.query as {username : string};

        if(username.length < 3){
            return sendError(res, 400, "Ingrese más de 3 caracteres.");
        }

        const [existedUser] = await pool.query<GetUsernameType[]>(registerQueries.searchUsername, [username.trim()]);
        if(existedUser.length === 0){
            return sendSuccess(res, 200, [], "Usuario disponible.");
        }else{
            const taken = new Set(existedUser.map(u => u.username));
            const suggestions = generateUsernames(username, taken);
            
            return sendSuccess(res, 409, { taken: existedUser, suggestions }, "Usuario ya existe.");
        }
    }catch{
        return sendError(res, 500, "Error en el servidor.");
    }
});

router.get('/verify-email' , async(req: Request, res:Response) => {
    const {token, email} = req.query as {token: string; email: string};
    
    const emailNormalized = email.trim().toLowerCase();

    const record = tokenStore[emailNormalized];
    if(!record) return res.redirect(`http://localhost:5173/verify-result?verified=false`);
    if(record.token !== token || Date.now() > record.expiresAt){
        return res.redirect(`http://localhost:5173/verify-result?verified=false`);
    }

    await pool.query(registerQueries.updateValidationState, [emailNormalized]);

    delete tokenStore[emailNormalized];

    return res.redirect(`http://localhost:5173/verify-result?verified=true`);
});


export default router;