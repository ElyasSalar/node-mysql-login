import db from '../../DB/db'

export default function getUsers(req, res) {
  
  if(req.method === 'POST'){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const sqlPost = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    const sqlGet = "SELECT email FROM users WHERE email=?"
    const values = [name, email, password];

    db.query(sqlGet, email, (err, result) => {
      if(err) throw err;

      if(result.length == 0) {

        db.query(sqlPost, values, (err, result) => {
          if(err) throw err;
      
          res.status(200).json({
            created: true,
            loggedIn: true,
          })
        })

      }
      res.status(200).json({
        created: false,
        message: 'user with this email already exist!',
      })
    })

  }

  if(req.method === 'GET'){
    const sql = 'SELECT * FROM users'
    db.query(sql, (err, result) => {
      if(err) throw err;

      res.status(200).json({ users: result })
    })
  }
}
