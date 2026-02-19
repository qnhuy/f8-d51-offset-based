const postModel = require('../models/post.model')
const postService = require('../services/post.service')

class PostController {
  async getAll(req, res) {
    const result = await postService.pagination(
      +req.query.page || 1,
      +req.query.limit || 20,
      req.query.user_id ? { user_id: +req.query.user_id } : null,
    )
    res.paginate(result)
  }

  async getOne(req, res) {
    const results = await postModel.findOne(req.params.id)
    if (!results) res.error(404, 'Resource not found')
    res.success(results)
  }
}

module.exports = new PostController()
