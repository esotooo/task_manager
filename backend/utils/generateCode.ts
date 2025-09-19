import otpGenerator from 'otp-generator';

export function generateCode(){
    const code = otpGenerator.generate(6, {
        upperCaseAlphabets: false, 
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true
    });

    const expiresAt = Date.now() + 5 * 60 * 1000; 

    return {code, expiresAt};
}