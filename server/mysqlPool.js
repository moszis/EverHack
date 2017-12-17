var mysql = require('mysql');

var pool  = mysql.createPool({
       host: '127.0.0.1',
       user: 'root',
       password: 'mosmos',
       port: 3306,
       database: 'everhack' 
});
   
   
exports.pool = pool;


