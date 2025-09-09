import {body, validationResult} from 'express-validator';
import { sendError } from '../utils/responseHandler';
import pool from '../database/connection';
import { registerQueries } from '../SQL/Auth/registerQueries';
import { GetEmailType, GetUsernameType } from '../types/usersTypes';
import { NextFunction, Request, Response } from 'express';

export const validateUserRegister = [
    body('firstname')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio.')
        .isLength({min: 2, max: 50})
        .withMessage('El nombre debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios.'),

    body('lastname')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio.')
        .isLength({min: 2, max: 50})
        .withMessage('El apellido debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El apellido solo puede contener letras y espacios.'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El usuario es obligatorio.')
        .isLength({min: 3, max: 30})
        .withMessage('El usuario debe tener entre 3 y 30 caracteres.')
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos.')
        .custom( async(username) => {
            const [users] = await pool.query<GetUsernameType[]>(registerQueries.validateUsername, [username])
            if(users.length > 0){
                throw new Error ('El usuario ya esta en uso.')
            }
            return true;
        }),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio.')
        .isEmail()
        .withMessage('El email no tiene un formato válido.')
        .custom( async(email) => {
            const [users] = await pool.query<GetEmailType[]>(registerQueries.validateEmail, [email])
            if(users.length > 0 ){
                throw new Error ('El correo electrónico ya esta registrado.')
            }
            return true;
        }),
    
    body('user_password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({min: 8, max: 128})
        .withMessage('La contraseña debe tener entre 8 y 128 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos: 1 minúscula, 1 mayúscula y 1 número.'),

    body('confirm_password')
        .notEmpty()
        .withMessage('Confirmación de contraseña requerida.')
        .custom((value, { req }) => {
            if (value !== req.body.user_password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        })
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const firstError = errors.array()[0];

        let statusCode = 400; 

        if (firstError.msg.includes('ya está') || 
            firstError.msg.includes('ya esta') ||
            firstError.msg.includes('registrado') ||
            firstError.msg.includes('en uso')) {
            statusCode = 409; 
        }

        return sendError(res, statusCode, firstError.msg)
    }

    next();
}