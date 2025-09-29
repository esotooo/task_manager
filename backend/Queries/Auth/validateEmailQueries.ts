const validateEmail = `SELECT id_user, is_valid FROM users WHERE email = ?`;

export const validateEmailQueries = {
    validateEmail: validateEmail
}