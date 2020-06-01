const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Base de Datos fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Base de Datos tiene algunas conecciones.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Base de Datos la conexion fue rechazada.');
        }
    }

    if (connection) connection.release();
    console.log('Base de Datos conectada.');

    return;
});

pool.query = promisify(pool.query);

module.exports = pool;