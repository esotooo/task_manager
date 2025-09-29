const registerUserQuery = `INSERT INTO users(firstname, lastname, username, email, user_password, is_valid) 
    VALUES(?, ?, ?, ?, ?, ?)`;

const validateUsername = `SELECT username FROM users WHERE username = ? `

const searchUsername = `SELECT username FROM users WHERE username LIKE ?`

const validateEmail = `SELECT email FROM users WHERE email = ? `

const updateValidationState = `UPDATE users SET is_valid = 1 WHERE email = ?`

export const registerQueries = {
    registerUserQuery : registerUserQuery,
    validateUsername: validateUsername,
    validateEmail: validateEmail,
    searchUsername: searchUsername,
    updateValidationState: updateValidationState
}