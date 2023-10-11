const express = require('express')
const { productController } = require('../controllers')
const routers = express.Router()

routers.get('/get', productController.getData)
routers.post('/add-products', productController.addData)
routers.patch('/edit-products/:ProductID', productController.editData)
routers.delete('/delete-products/:ProductID', productController.deleteData)

module.exports = routers