import {pool} from "../config/database.js"

export default (req, res) => {
    let sql = "SELECT nom, prenom, id FROM users"
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}