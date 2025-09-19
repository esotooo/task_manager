const verifiyExistingEmail = `SELECT firstname, lastname FROM users WHERE email = ?;`

const updatePassword = `UPDATE users SET user_password = ? WHERE email = ? `;

export const changePasswordQueries = {
    verifiyExistingEmail: verifiyExistingEmail,
    updatePassword: updatePassword
}
