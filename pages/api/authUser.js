import db from "../../DB/db";

export default function authentication(req, res){
  if(req.method === 'POST'){
    const sql = 'SELECT id, name, email, password FROM users WHERE email=? and password=?';
    const cred = [req.body.email, req.body.password]

    db.query(sql, cred, (err, result) => {
      if(err) throw err;

      if(result.length > 0){

        res.status(200).json({
          loggedIn: true,
          message: "success",
          result: result,
        })
      }
      res.status(200).json({
        loggedIn: false,
        message: "I already have an account, please log in",
        result: result
      })
    })
  }
}