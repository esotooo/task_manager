import {body, validationResult} from 'express-validator';
import pool from '../database/connection';
import { registerQueries } from '../Queries/Auth/registerQueries';
import {  GetUsernameType } from '../types/usersTypes';
import { NextFunction, Request, Response } from 'express';
import { validateEmailDomain } from './validateEmailDomain';
import { GetEmailType } from '../types/MailType';
import { sendVerificationEmail } from '../utils/emailGenerator';

export const validateUserRegister = [
    body('firstname')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su nombre.')
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage('El nombre debe tener entre 2 y 50 caracteres.')
        .bail()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El nombre solo puede contener letras y espacios.'),

    body('lastname') 
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su apellido.')
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage('El apellido debe tener entre 2 y 50 caracteres.')
        .bail()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('El apellido solo puede contener letras y espacios.'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su nombre de usuario.')
        .bail()
        .isLength({min: 3, max: 30})
        .withMessage('El usuario debe tener entre 3 y 30 caracteres.')
        .bail()
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage('El usuario solo puede contener letras, números, puntos, guiones y guiones bajos.')
        .bail()
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
        .withMessage('Por favor, ingrese su correo electrónico.')
        .bail()
        .isEmail()
        .withMessage('El email no tiene un formato válido.')
        .bail()
        .custom( async(email) => {
            const [users] = await pool.query<GetEmailType[]>(registerQueries.validateEmail, [email]);
            if(users.length > 0 ){
                throw new Error ('El correo electrónico ya esta registrado.');
            }
            return true;
        })
        .custom(async(email) => {
            const isValid = await validateEmailDomain(email)
            if(!isValid){
                throw new Error ('Ingrese un dominio existente.');
            }
            return true;
        }),
    
    body('user_password')
        .notEmpty()
        .withMessage('Por favor, ingrese su contraseña.')
        .bail()
        .isLength({min: 8, max: 128})
        .withMessage('La contraseña debe tener entre 8 y 128 caracteres.')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/)
        .withMessage('La contraseña ingresada no es válida.'),

    body('confirm_password')
        .notEmpty()
        .withMessage('Por favor, confirme su contraseña.')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.user_password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        })
];

export const handleValidationErrorsByField = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsByField: Record<string, string> = {};
        
        errors.array().forEach((error) => {
        const field = (error as any).param || (error as any).path || "general";
        errorsByField[field] = error.msg;
        });

        const hasConflict = Object.values(errorsByField).some(msg => 
            msg.includes('ya esta registrado.') || msg.includes('ya esta en uso.')
        )

        const statusCode = hasConflict ? 409 : 400

        return(res.status(statusCode).json({
            success: false,
            fields: errorsByField
        }));
    }

    next();
};

