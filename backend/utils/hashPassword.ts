import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string){
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}