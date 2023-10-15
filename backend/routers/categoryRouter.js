const express = require('express')
const { categoryController } = require('../controllers')
const routers = express.Router()

routers.get('/get', categoryController.getData)
routers.post('/add-category', categoryController.addData)
routers.delete('/delete-category/:CategoryID', categoryController.deleteData)

module.exports = routers