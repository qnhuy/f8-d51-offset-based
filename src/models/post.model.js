const pool = require('../config/database')

class PostModel {
  async findAll(limit, offset, conditions) {
    let conditionQuery
    if (conditions) {
      conditionQuery = Object.entries(conditions)
        .map(([key, value]) => {
          value = typeof value === 'number' ? value : `"${value}"`
          return `${key}=${value}`
        })
        .join(' and ')
    }

    const [results] = await pool.execute(
      `select * from posts ${conditions ? `where ${conditionQuery}` : ''} limit ? offset ?`,
      [String(limit), String(offset)],
    )
    return results
  }

  async count(conditions) {
    let conditionQuery
    if (conditions) {
      conditionQuery = Object.entries(conditions)
        .map(([key, value]) => {
          value = typeof value === 'number' ? value : `"${value}"`
          return `${key}=${value}`
        })
        .join(' and ')
    }

    const [result] = await pool.execute(
      `select count(*) as total from posts ${conditions ? `where ${conditionQuery}` : ''}`,
    )
    return result[0].total
  }

  async findOne(id) {
    const [results] = await pool.execute('select * from posts where id = ? ', [
      id,
    ])
    return results[0]
  }

  async create(postData) {
    const fields = Object.keys(postData).join(', ')
    const placeholders = Object.keys(postData)
      .map(() => '?')
      .join(', ')
    const values = Object.values(postData)

    const [results] = await pool.execute(
      `insert into posts (${fields}) values (${placeholders})`,
      values,
    )
    const [newPost] = await pool.execute(
      'select * from posts where id = ?',
      results.insertId,
    )
    return newPost
  }

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ')
    const values = Object.values(data)
    const [results] = await pool.execute(
      `update task set ${fields} where id = ?`,
      [values, id],
    )
    return results.affectedRows
  }

  async remove(id) {
    const [results] = await pool.execute('delete from posts where id = ?', [id])
    return results.affectedRows
  }
}

module.exports = new PostModel()
