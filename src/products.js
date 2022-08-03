const fs = require('fs')

let productList = []
fs.writeFileSync('./productos.txt', JSON.stringify(productList, null, 2), 'utf-8')

function idCompare(data) {
    let currentMaxId = 0
    let idsToCompare = []
    data.forEach(element => {
        idsToCompare.push(element.id)
        if(idsToCompare.length == 0) {
            currentMaxId = 0
        } else {
            currentMaxId = Math.max(...idsToCompare)
        }
        return currentMaxId
    })
    return currentMaxId
}

function save(newData) {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    let newProductId = idCompare(productData) + 1
    //product.id = newProductId
    const newProduct = {
        id: newProductId,
        title: newData.productName,
        price: newData.productPrice,
        image: newData.productThumbnail
    }
    const newProductList = [...productData, newProduct]
    console.log(newProductList);
    fs.writeFileSync('./productos.txt', JSON.stringify(newProductList, null, 2), 'utf-8')
    return newProduct
}

function getById(id) {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    if (productData.length == 0){
        console.log('No se encontraron productos.')
        return 'No se encontraron productos. GET BY ID'
    } else {
        let requestedProduct = productData.find(element => element.id == id)
        if(requestedProduct != null) {
            console.log(requestedProduct);
            return requestedProduct
        } else {
            console.log('No se encontró el producto.');
            return 'No se encontró el producto.'
        }
    }
}

function getRandom() {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    if (productData.length == 0) {
        console.log('No se encontraron productos.')
        return 'No se encontraron productos. RANDOM'
    } else {
        let randomNumber = Math.floor(Math.random() * productData.length)
        let requestRandom = productData[randomNumber]
        console.log('Producto: ' + JSON.stringify(requestRandom));
        return requestRandom
    }
}

function getAll() {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    if (productData.length == 0){
        console.log('No se encontraron productos.')
        return 'No se encontraron productos. ALL'
    } else {
        console.log('Lista completa de productos:\n' + JSON.stringify(productData, null, 2));
        return productData
    }
}

function update(id, updatedData) {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    if (productData.length === 0) {
        console.log('No se encontraron productos.')
        return 'No se encontraron productos. UPDATE'
    } else {
        const product = getById(id)
        if (product.id == null) {
            const newProduct = save(updatedData)
            console.log(newProduct);
            const updatedProductList = [...productData, newProduct]
            fs.writeFileSync('./productos.txt', JSON.stringify(updatedProductList, null, 2), 'utf-8')
            console.log(updatedProductList);
            return newProduct
        } else {
            deleteById(id)
            const updatedProduct = save(updatedData)
            console.log(updatedProduct);
            const updatedProductList = [...productData, updatedProduct]
            fs.writeFileSync('./productos.txt', JSON.stringify(updatedProductList, null, 2), 'utf-8')
            console.log(updatedProductList);
            return updatedProduct
        }
    }
}

function deleteById(id) {
    const productData = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
    if (productData.length === 0) {
        console.log('No se encontraron productos.')
        return 'No se encontraron productos. DELETE BY ID'
    } else {
        const product = getById(id)
        productData.splice(product, 1)
        let updatedProductList = [...productData]
        fs.writeFileSync('./productos.txt', JSON.stringify(updatedProductList, null, 2), 'utf-8')
        console.log('Nueva lista de productos:\n' + JSON.stringify(updatedProductList, null, 2));
        return updatedProductList
    }
}

function deleteAll() {
    let emptyProductList = []
    fs.writeFileSync('./productos.txt', JSON.stringify(emptyProductList, null, 2), 'utf-8')
    console.log('No hay productos para mostrar.')
    return 'No hay productos para mostrar. DELETE ALL'
}

module.exports = { productList, idCompare, save, getById, getRandom, getAll, update, deleteById, deleteAll }
