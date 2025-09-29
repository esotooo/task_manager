import { TokenType } from "../types/MailType";
import crypto from 'crypto';
import { sendVerificationEmail } from "./emailGenerator";

export const tokenStore : TokenType = {}

export const generateVerificationToken = async ( email : string) => {
    const token = crypto.randomBytes(32).toString('hex');
    tokenStore[email] = {token, expiresAt: Date.now() + 1000 * 60 * 30 };

    const emailNormalized = email.trim().toLowerCase();
    
    const verificationUrl = `http://localhost:4000/api/users/verify-email?token=${token}&email=${emailNormalized}`;

    await sendVerificationEmail({
        email: emailNormalized,
        verificationUrl
    });
}