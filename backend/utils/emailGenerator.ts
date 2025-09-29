import nodemailer from 'nodemailer';
import type { MailType } from '../types/MailType';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    },
});

export async function sendChangePasswordEmail({ email, firstname, lastname, otp }: MailType) {
    try {

        const emailNormalized = email.trim().toLowerCase()

        const mailConfigs = {
            from: `"Task Flow" <${process.env.GMAIL_MAIL}>`,
            to: emailNormalized,
            subject: `Código de verificación.`,
            text: `¡Hola ${firstname} ${lastname}! Tu código de verificación es: ${otp}. Es válido por 5 minutos.`
        };

        const info = await transporter.sendMail(mailConfigs);
        return info; 
    } catch (error) {
        throw error;
    }
}

export async function sendVerificationEmail({email, verificationUrl} : MailType){
    try{

        const emailNormalized = email.trim().toLowerCase()

        const mailConfigs = {
            from: `"Task Flow" <${process.env.GMAIL_MAIL}>`,
            to: emailNormalized,
            subject: `Verificación de correo electrónico.`,
            html: `<a href="${verificationUrl}">Verificar correo</a>`
        };

        const info = await transporter.sendMail(mailConfigs);
        return info;
    }catch (error){
        throw error;
    }
}



