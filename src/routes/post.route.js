const postController = require('../controllers/post.controller')

const router = require('express').Router()

router.get('/', postController.getAll)
router.get('/:id', postController.getOne)

module.exports = router
