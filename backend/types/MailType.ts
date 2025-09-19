export type MailType = {
    email: string,
    firstname: string,
    lastname: string,
    otp: string,
};

export type OTPType = {
    [email: string]: { code: string; expiresAt: number };
};