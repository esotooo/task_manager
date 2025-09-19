import pool from '../../database/connection';
import { Router, Request, Response} from 'express';
import { ResultSetHeader } from 'mysql2';
import { hashPassword } from '../../utils/hashPassword';
import { sendError, sendSucess } from '../../utils/responseHandler';
import { registerQueries } from '../../Queries/Auth/registerQueries';
import { handleValidationErrorsByField, validateUserRegister } from '../../middlewares/validateUserRegister';
import { GetUsernameType } from '../../types/usersTypes';
import { generateUsernames } from '../../utils/generateUsernames';

const router = Router()

router.post('/register', validateUserRegister, handleValidationErrorsByField, async (req: Request, res: Response) => {
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
        return sendError(res, 500, "Error en el servidor.");
    }
})


router.get('/search-username', async(req: Request, res: Response) => {
    try{
        const {username}  = req.query as {username : string};

        if(username.length < 3){
            return sendError(res, 400, "Ingrese más de 3 caracteres.");
        }

        const [existedUser] = await pool.query<GetUsernameType[]>(registerQueries.searchUsername, [username.trim()]);
        if(existedUser.length === 0){
            return sendSucess(res, 200, [], "Usuario disponible.");
        }else{
            const taken = new Set(existedUser.map(u => u.username));
            const suggestions = generateUsernames(username, taken);
            
            return sendSucess(res, 409, { taken: existedUser, suggestions }, "Usuario ya existe.");
        }
    }catch{
        return sendError(res, 500, "Error en el servidor.")
    }
})

export default router;