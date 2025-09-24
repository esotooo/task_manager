import {body, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const validateEmail = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su correo electrónico.')
        .bail()
        .isEmail()
        .withMessage('Ingrese un correo electrónico válido.')
        .bail(),
]

export const validateOTP = [
    body('otp')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese el código de verificación enviado a su correo.')
        .bail()
        .isLength({min: 6, max: 6})
        .withMessage('El código debe tener exactamente 6 dígitos.')
        .bail()
        .matches(/^[0-9]+$/)
        .withMessage('El código solo puede contener números.')
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
