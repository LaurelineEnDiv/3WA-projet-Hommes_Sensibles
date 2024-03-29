import { pool } from "./../../config/database.js";

export default (req, res) => {
  const { id } = req.body;
  const paramsSQL = [id];
  const sql = `
    SELECT * FROM team 
    WHERE id = ?`;

  pool.query(sql, paramsSQL, (err, result) => {
    if (err) throw err;
    res.json({ result });
  });
};
