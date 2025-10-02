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
        const emailNormalized = email.trim().toLowerCase();

        const mailConfigs = {
            from: `"Task Flow" <${process.env.GMAIL_MAIL}>`,
            to: emailNormalized,
            subject: `Código de verificación`,
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; text-align: center;">
                    <h2 style="color: #333;">¡Hola ${firstname} ${lastname}!</h2>
                    <p style="color: #555; font-size: 16px;">Tu código de verificación es:</p>
                    <div style="font-size: 28px; font-weight: bold; color: #000; margin: 20px 0; letter-spacing: 2px;">
                        ${otp}
                    </div>
                    <p style="color: #555; font-size: 14px;">Es válido por 5 minutos.</p>
                    <div style="margin-top: 30px;">
                        <p style="color: #888; font-size: 12px;">Si no solicitaste este código, ignora este correo.</p>
                    </div>
                </div>
            </div>`
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
            subject: `Verificación de correo electrónico`,
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; text-align: center;">
                    <h2 style="color: #333;">¡Bienvenido a Task Flow!</h2>
                    <p style="color: #555; font-size: 16px;">Haz clic en el botón de abajo para verificar tu correo electrónico:</p>
                    <a href="${verificationUrl}" 
                        style="
                            display: inline-block;
                            padding: 12px 25px;
                            margin: 20px 0;
                            background-color: #000;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 7px;
                            font-weight: bold;
                            font-size: 16px;
                        ">
                        Verificar correo
                    </a>
                    <p style="color: #555; font-size: 14px;">Si no creaste esta cuenta, ignora este correo.</p>
                </div>
            </div>`
        };

        const info = await transporter.sendMail(mailConfigs);
        return info;
    }catch (error){
        throw error;
    }
}




