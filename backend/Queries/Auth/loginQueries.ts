const loginByEmailQuery = `SELECT id_user, firstname, lastname, user_password, username, email, is_valid FROM users WHERE email = ?`;

export const loginQueries = {
    loginByEmailQuery: loginByEmailQuery
}



