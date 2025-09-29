import {body, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su correo electrónico.'),
        
    body('user_password')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su contraseña.')
]

export const handleLoginErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorsByField: Record<string, string> = {};
        
        errors.array().forEach((error) => {
        const field = (error as any).param || (error as any).path || "general";
        errorsByField[field] = error.msg;
        });

        return(res.status(400).json({
            success: false,
            fields: errorsByField
        }));
    }
    
    next();
}