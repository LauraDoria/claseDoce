const express = require('express');
const {Router} = express
const router = Router()
const controllers = require('./controllers');

/*Rutas*/
//form
router.get('/form', (req, res) => {
    res.render('form')
    console.log('GET request succesful');
})
//chat
router.get('/chat', (req, res) => {
    res.render('chat')
    console.log('GET request succesful');
})
//cargar producto
router.post('/form', (req, res) => {
    const newData = req.body
    res.send(controllers.addNewProduct(newData))
    //res.redirect("/form")
    console.log('POST request succesful');
})
//buscar producto por id
router.get('/product/:id', (req, res) => {
    const {id} = req.params
    res.render('product', {title: controllers.getProductById(id).title, price: controllers.getProductById(id).price, thumbnail: controllers.getProductById(id).image})
    console.log('GET request succesful')
})
//ver producto al azar
router.get('/random', (req, res) => {
    res.render('product', {title: controllers.getRandomProduct().title, price: controllers.getRandomProduct().price, thumbnail: controllers.getRandomProduct().image})
    console.log('GET request succesful')
})
//ver todos los productos
router.get('/all', (req, res) => {
    res.render('list', {products: controllers.getAllProducts()})
    console.log('GET request succesful')
})
//modificar producto
router.put('/product/update/:id', (req, res) => {
    const {id} = req.params
    const newData = req.body
    res.render('product', {title: controllers.updateProduct(id, newData).title, price: controllers.updateProduct(id, newData).price, thumbnail: controllers.updateProduct(id, newData).image})
    console.log('PUT request succesful')
})
//eliminar producto
router.delete('/product/delete/:id', (req, res) => {
    const {id} = req.params
    res.send(controllers.deleteProductById(id))
    console.log('DELETE request succesful')
})
//eliminar todos
router.delete('/noProducts', (req, res) => {
    res.send(controllers.deleteAllProducts())
    console.log('DELETE request succesful')
})

module.exports = router