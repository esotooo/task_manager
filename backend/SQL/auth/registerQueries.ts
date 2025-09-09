const registerUserQuery = `INSERT INTO users(firstname, lastname, username, email, user_password) 
    VALUES(?, ?, ?, ?, ?)`;

const validateUsername = `SELECT username FROM users WHERE username = ? `

const validateEmail = `SELECT email FROM users WHERE email = ? `

export const registerQueries = {
    registerUserQuery : registerUserQuery,
    validateUsername: validateUsername,
    validateEmail: validateEmail
}