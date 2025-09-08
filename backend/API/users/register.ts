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

        //Validacion de campos llenos
        if(!firstname && !lastname && !username && !email && !user_password){
            return sendError(res, 400, "Todos los campos son requeridos.");
        }else if(!firstname){
            return sendError(res ,400, "El campo nombre es obligatorio.");
        }else if(!lastname){
            return sendError(res, 400, "El campo apellido es obligatorio.");
        }else if(!username){
            return sendError(res, 400, "El campo usuario es obligatorio.");
        }else if(!email){
            return sendError(res, 400, "El campo correo electrónico es obligatorio.");
        }else if(!user_password){
            return sendError(res, 400, "El campo contraseña es obligatorio.");
        }

        //Verificar longitudes
        const trimmedFirstname = firstname.trim();
        const trimmedLastname = lastname.trim();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = user_password.trim();

        if(trimmedFirstname.length < 5 || trimmedFirstname.length > 50){
            return sendError(res, 400, "El nombre debe tener entre 5 y 50 caracteres.");
        }else if(trimmedLastname.length < 5 || trimmedLastname.length > 50){
            return sendError(res, 400, "El apellido debe tener entre 5 y 50 caracteres.");
        }else if(trimmedUsername.length < 3 || trimmedUsername.length > 30){
            return sendError(res, 400, "El usuario debe tener entre 3 y 30 caracteres.");
        }else if(trimmedPassword.length < 8 || trimmedPassword.length > 128){
            return sendError(res, 400, "La contraseña debe tener entre 6 y 128 caracteres.");
        }

        //Validar formatos
        const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
        if(!usernameRegex.test(trimmedUsername)){
            return sendError(res, 400, "Username solo puede contener letras, números, puntos, guiones y guiones bajos.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return sendError(res, 400, "Email no tiene formato válido.");
        }

        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(trimmedFirstname) || !nameRegex.test(trimmedLastname)) {
            return sendError(res, 400, "Nombre y apellido solo pueden contener letras y espacios.");
        }

        const [existingUsers] = await pool.query<GetUserType[]>(registerQueries.registerUserQuery, [trimmedUsername, trimmedEmail])

        if(existingUsers.length > 0){
            const existing = existingUsers[0];
            if(existing.username === trimmedUsername){
                return sendError(res, 400, "El usuario ya esta en uso.")
            }else if(existing.email === trimmedEmail){
                return sendError(res, 400, "El correo electrónico ya esta registrado.")
            }
        }

        //Ingresar contraseña ya hasheada la base de datos
        const hashedPassword = await hashPassword(user_password);
        const [register] = await pool.query<ResultSetHeader>(registerQueries.registerUserQuery, [
            trimmedFirstname, trimmedLastname, trimmedUsername, trimmedEmail, hashedPassword
        ])

        //Proceder con el registro
        if(register.affectedRows > 0){
            const newUser = {
                id_user: register.insertId,
                firstname: trimmedFirstname,
                lastname: trimmedLastname, 
                username: trimmedUsername, 
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

