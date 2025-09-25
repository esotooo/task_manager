import {body, validationResult} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { otpStore } from '../API/users/changePassword';
import { sendError } from '../utils/responseHandler';

export const validateEmail = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese su correo electrónico.')
        .bail()
        .isEmail()
        .withMessage('Ingrese un correo electrónico válido.')
        .bail(),
];

export const validateOTP = [
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("Por favor, ingrese el código de verificación enviado a su correo.")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("El código debe tener exactamente 6 dígitos.")
    .bail()
    .matches(/^[0-9]+$/)
    .withMessage("El código solo puede contener números.")
    .custom((value, { req }) => {
      const emailNormalized = req.body.email.trim().toLowerCase();
      const storedOTP = otpStore[emailNormalized];

      if (!storedOTP) {
        throw new Error("No se encontró un código para este correo.");
      }

      if (Date.now() > storedOTP.expiresAt) {
        delete otpStore[emailNormalized];
        throw new Error("El código ha expirado.");
      }

      if (storedOTP.code !== value) {
        throw new Error("Código incorrecto.");
      }

      return true;
    }),
];

export const validateNewPassword = [
    body('user_password')
        .notEmpty()
        .withMessage("Por favor, ingrese su contraseña nueva.")
        .bail()
        .isLength({min: 8, max: 128})
        .withMessage('La contraseña debe tener entre 8 y 128 caracteres.')
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/)
        .withMessage('La contraseña ingresada no es válida.'),
];


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
