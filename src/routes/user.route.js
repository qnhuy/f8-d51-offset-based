const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

module.exports = router
