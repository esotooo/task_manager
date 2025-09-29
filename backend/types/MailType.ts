import { RowDataPacket } from "mysql2";

export type MailType = {
    email: string,
    firstname?: string,
    lastname?: string,
    otp?: string,
    verificationUrl?: string
};

export type OTPType = {
    [email: string]: { code: string; expiresAt: number };
};

export type TokenType = {
    [email: string]: {token: string, expiresAt: number};
};


export interface GetEmailType extends RowDataPacket{
    email: string,
    firstname: string,
    lastname: string
}