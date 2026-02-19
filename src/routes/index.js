const route = require('express').Router()
const postRoutes = require('./post.route')
const userRoutes = require('./user.route')

route.use('/posts', postRoutes)
route.use('/users', userRoutes)

module.exports = route
