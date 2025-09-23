import {body, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const validateEmail = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio.')
        .bail()
        .isEmail()
        .withMessage('El correo electrónico ingresado no tiene un formato válido.')
        .bail(),
]

export const handleValidationErrorsByField = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
};
