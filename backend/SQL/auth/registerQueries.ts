const registerUserQuery = `INSERT INTO users(firstname, lastname, username, email, user_password) 
    VALUES(?, ?, ?, ?, ?)`;

const validateUser = `SELECT username,email FROM users WHERE username LIKE ? OR email LIKE ? LIMIT 50; `

export const registerQueries = {
    registerUserQuery : registerUserQuery,
    validateUser: validateUser
}