import {pool} from "../../config/database.js"

export default (req, res) => {
    let sql = `
    SELECT id, name FROM shows_categories`
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}