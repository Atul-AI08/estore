const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'atul',
    password: 'Atul@123',
    database: 'estore',
    port: 3306,
    multipleStatements: true
})

module.exports = pool;