const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'login'
});

db.connect((err, res) => {
  if(err) throw err;
  
  return;
});

export default db;