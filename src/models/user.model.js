const pool = require('../config/database')

class UserModel {
  async findAll(limit, offset) {
    const [results] = await pool.execute(
      `select * from users limit ? offset ?`,
      [String(limit), String(offset)],
    )
    return results
  }

  async count() {
    const [result] = await pool.execute(`select count(*) as total from users`)
    return result[0].total
  }

  async findOne(id) {
    const [results] = await pool.execute('select * from users where id = ? ', [
      id,
    ])
    return results
  }

  async remove(id) {
    const [results] = await pool.execute('delete from users where id = ?', [id])
    return results.affectedRows
  }
}

module.exports = new UserModel()
