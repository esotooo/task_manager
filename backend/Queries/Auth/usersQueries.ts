const loginByEmailQuery = `SELECT id_user, firstname, lastname, user_password FROM users WHERE email = ?`;

const loginByUsernameQuery = `SELECT id_user, firstname, lastname, user_password FROM users WHERE username = ?`;

export const usersQueries = {
    loginByEmailQuery: loginByEmailQuery,
    loginByUsernameQuery: loginByUsernameQuery,
}