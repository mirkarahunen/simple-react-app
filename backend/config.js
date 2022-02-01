const mysql = require('mysql')

// Set mysql connection
const connection = mysql.createConnection({
    user: 'root',
    password: 'root',
    port: 8889,
    host: 'localhost',
    database: 'simple_react_app'
})

// Connect to database
connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('MySQL database connected');
        
    }

})

module.exports = connection