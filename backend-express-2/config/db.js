const mysql = require('mysql2');
require('dotenv').config(); // Archivo de configuracion

// Crear pool de conexiones <- mejora y rendimiento
const pooldb = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertit a promesa para usar async/await
const promisePoolDb = pooldb.promise();

// My SQL Database
pooldb.getConnection((error, connection) => {
    if (error) {
        console.log("Ocurrió un error al conectarse al servidor MySQL:")
        console.log(error.message)
        return;
    }
    console.log('Conexión exitosa al servidor MySQL')
    connection.release();
});

module.exports = promisePoolDb;