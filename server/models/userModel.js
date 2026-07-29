const db = require("../config/db");

// Create User
const createUser = (userData, callback) => {
    const {
        company_id,
        full_name,
        email,
        password,
        role
    } = userData;

    const sql = `
        INSERT INTO users (
            company_id,
            full_name,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            company_id,
            full_name,
            email,
            password,
            role
        ],
        callback
    );
};

// Find User By Email
const findUserByEmail = (email, callback) => {
    const sql = `
        SELECT
            id,
            company_id,
            full_name,
            email,
            password,
            role,
            created_at
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

module.exports = {
    createUser,
    findUserByEmail
};