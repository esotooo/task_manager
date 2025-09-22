import pool from '../../database/connection';
import { Router, Request, Response } from 'express';
import { sendError, sendSuccess } from '../../utils/responseHandler';
import { GetEmailType } from '../../types/MailType';
import { changePasswordQueries } from '../../Queries/Auth/changePassword';
import { generateCode } from '../../utils/generateCode';
import { sendEmail } from '../../utils/emailGenerator';
import { OTPType } from '../../types/MailType';
import { hashPassword } from '../../utils/hashPassword';
import { ResultSetHeader } from 'mysql2';

const router = Router();

// OTP temporal almacenado por email
export const otpStore: OTPType = {};
const verifiedEmails: Set<string> = new Set();


router.post('/send-otp', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return sendError(res, 400, 'El correo es obligatorio.');

        // Generar código OTP
        const { code, expiresAt } = generateCode();

        const emailNormalized = email.trim().toLowerCase();

        // Verificar que el email exista en la DB
        const [existingEmail] = await pool.query<GetEmailType[]>(
            changePasswordQueries.verifiyExistingEmail,
            [emailNormalized]
        );

        if (existingEmail.length === 0) {
            return sendError(res, 400, 'El correo electrónico ingresado aún no está registrado. ¿Desea registrarse? ');
        }

        // Guardar OTP temporal
        otpStore[emailNormalized] = { code, expiresAt };

        // Enviar OTP por correo
        await sendEmail({
            email: emailNormalized,
            firstname: existingEmail[0].firstname,
            lastname: existingEmail[0].lastname,
            otp: code
        });

        return sendSuccess(res, 200, [],'OTP enviado exitosamente.');

    } catch{
        return sendError(res, 500, 'Error en la conexión con el servidor.');
    }
});


router.post('/verify-otp', async(req: Request, res: Response) => {
    try{
        const {email, otp} = req.body;

        if(!otp) return sendError(res, 401, "El OTP es obligatorio.");

        const emailNormalized = email.trim().toLowerCase();
        const storedOTP = otpStore[emailNormalized];

        if(Date.now() > storedOTP.expiresAt){
            delete otpStore[emailNormalized];
            return sendError(res, 400, "El OTP ha expirado. ¿Desea reenviarlo?");
        }

        if(storedOTP.code !== otp){
            return sendError(res, 403, "OTP incorrecto.");
        }

        verifiedEmails.add(emailNormalized);
        delete otpStore[emailNormalized];

        return sendSuccess(res, 200, 'OTP verificado correctamente.')    
    }catch{
        return sendError(res, 500, "Error en la conexión con el servidor.")
    }
})

router.put('/change-password', async(req: Request, res: Response) => {
    try{
        const {email, user_password} = req.body;
        const emailNormalized = email.trim().toLowerCase();
        const hashedPassword = await hashPassword(user_password);

        if (!verifiedEmails.has(emailNormalized)) {
            return sendError(res, 400, 'Debes verificar el OTP antes de cambiar la contraseña.');
        }

        await pool.query<ResultSetHeader>(changePasswordQueries.updatePassword, [hashedPassword, emailNormalized]);

        verifiedEmails.delete(emailNormalized);

        return sendSuccess(res, 201, 'Contraseña actualizada exitosamente.')
    }catch{
        return sendError(res, 500, 'Error en la conexión con el servidor.')
    }
})

export default router;
