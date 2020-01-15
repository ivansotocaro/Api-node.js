const mysql = require('mysql');
const dbConfig = require('../config/dbConfig.js');

//Create a connection to the database

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database : dbConfig.DB
});

//Open the MySQL Connection

connection.connect( error =>{
    if(error) throw error;
    console.log('succesfully connect to the database');
});

module.exports = connection;