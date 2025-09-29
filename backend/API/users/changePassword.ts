import pool from '../../database/connection';
import { Router, Request, Response } from 'express';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { GetEmailType } from '../../types/MailType';
import { changePasswordQueries } from '../../Queries/Auth/changePassword';
import { generateCode } from '../../utils/generateCode';
import { sendChangePasswordEmail } from '../../utils/emailGenerator';
import { OTPType } from '../../types/MailType';
import { hashPassword } from '../../utils/hashPassword';
import { ResultSetHeader } from 'mysql2';
import { handleValidationErrorsByField, validateEmail, validateNewPassword, validateOTP } from '../../middlewares/validateChangePassword';

const router = Router();

// OTP temporal almacenado por email
export const otpStore: OTPType = {};
export const verifiedEmails: Set<string> = new Set();


router.post('/send-otp', validateEmail, handleValidationErrorsByField, async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Generar código OTP
        const { code, expiresAt } = generateCode();

        const emailNormalized = email.trim().toLowerCase();

        // Verificar que el email exista en la DB
        const [existingEmail] = await pool.query<GetEmailType[]>(
            changePasswordQueries.verifiyExistingEmail,
            [emailNormalized]
        );

        if (existingEmail.length === 0) {
            return sendError(res, 404, 'El correo electrónico ingresado aún no está registrado. ');
        }

        // Guardar OTP temporal
        otpStore[emailNormalized] = { code, expiresAt };

        // Enviar OTP por correo
        await sendChangePasswordEmail({
            email: emailNormalized,
            firstname: existingEmail[0].firstname,
            lastname: existingEmail[0].lastname,
            otp: code
        });

        return sendSuccess(res, 200, [], 'OTP enviado exitosamente.');

    } catch{
        return sendError(res, 500, 'Error en la conexión con el servidor.');
    }
});


router.post('/verify-otp', validateOTP, handleValidationErrorsByField, async(req: Request, res: Response) => {
    try{
        const {email} = req.body;

        const emailNormalized = email.trim().toLowerCase();

        verifiedEmails.add(emailNormalized);
        delete otpStore[emailNormalized];

        return sendSuccess(res, 200, [], 'Código verificado correctamente.')  
        
    }catch{
        return sendError(res, 500, "Error en la conexión con el servidor.")
    }
})
 
router.put('/change-password', validateNewPassword, handleValidationErrorsByField, async(req: Request, res: Response) => {
    try{
        const {email, user_password} = req.body;
        const emailNormalized = email.trim().toLowerCase();
        const hashedPassword = await hashPassword(user_password);

        if (!verifiedEmails.has(emailNormalized)) {
            return sendError(res, 403, 'Debes verificar el OTP antes de cambiar la contraseña.');
        }

        await pool.query<ResultSetHeader>(changePasswordQueries.updatePassword, [hashedPassword, emailNormalized]);

        verifiedEmails.delete(emailNormalized);

        return sendSuccess(res, 200, [], 'Contraseña actualizada exitosamente.')
    }catch{
        return sendError(res, 500, 'Error en la conexión con el servidor.')
    }
})

export default router;
