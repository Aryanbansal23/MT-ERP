const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const originalQuery = connection.query.bind(connection);

connection.query = function (...args) {
    console.log("================================");
    console.log("SQL:", args[0]);
    console.log("Arguments:", args.length);
    console.log("Last argument type:", typeof args[args.length - 1]);
    console.log("================================");

    return originalQuery(...args);
};

connection.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed");
        console.log(err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
    }
});

module.exports = connection;