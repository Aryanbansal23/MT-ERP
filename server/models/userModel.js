const db = require("../config/db");

const createUser = (userData, callback) => {
    const { full_name, email, password, role } = userData;

    const sql = `
        INSERT INTO users (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [full_name, email, password, role], callback);
};

// Find user by email
const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

module.exports = {
    createUser,
    findUserByEmail
};