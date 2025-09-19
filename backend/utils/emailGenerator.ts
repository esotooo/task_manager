import nodemailer from 'nodemailer';
import type { MailType } from '../types/MailType';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail({ email, firstname, lastname, otp }: MailType) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_MAIL,
                pass: process.env.GMAIL_PASS
            },
        });

        const mailConfigs = {
            from: `"Task Flow" <${process.env.GMAIL_MAIL}>`,
            to: email.trim(),
            subject: `Código de verificación.`,
            text: `¡Hola ${firstname} ${lastname}! Tu código de verificación es: ${otp}. Es válido por 5 minutos.`
        };

        const info = await transporter.sendMail(mailConfigs);
        return info; 
    } catch (error) {
        throw error;
    }
}



