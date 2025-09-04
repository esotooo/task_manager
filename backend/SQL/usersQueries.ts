const loginByEmailQuery = `SELECT id_user, firstname, lastname, user_password FROM users WHERE email = ?`;

const loginByUsernameQuery = `SELECT id_user, firstname, lastname, user_password FROM users WHERE username = ?`;

const registerQuery = `INSERT INTO users(firstname, lastname, username, email, user_password) 
    VALUES(?, ?, ?, ?, ?)`;

export const usersQueries = {
    loginByEmailQuery: loginByEmailQuery,
    loginByUsernameQuery: loginByUsernameQuery,
    registerQuery: registerQuery
}