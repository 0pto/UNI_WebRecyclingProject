const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',       
    user: 'ntodorov',        
    password: 'Fcq8DufX3E', 
    database: 'ntodorov'     
});
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
