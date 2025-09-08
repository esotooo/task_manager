const registerUserQuery = `INSERT INTO users(firstname, lastname, username, email, user_password) 
    VALUES(?, ?, ?, ?, ?)`;

const validateUser = `SELECT username FROM users WHERE username LIKE ? LIMIT 50; `

export const registerQueries = {
    registerUserQuery : registerUserQuery,
    validateUser: validateUser
}