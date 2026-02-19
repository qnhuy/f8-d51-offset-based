const userModel = require('../models/user.model')
const userService = require('../services/user.service')

class userController {
  async getAll(req, res) {
    const result = await userService.pagination(
      +req.query.page || 1,
      +req.query.limit || 20,
      req.query.user_id ? { user_id: +req.query.user_id } : null,
    )
    res.paginate(result)
  }

  async getOne(req, res) {
    const results = await userModel.findOne(req.params.id)
    if (!results) res.error(404, 'Resource not found')
    res.success(results)
  }
}

module.exports = new userController()
