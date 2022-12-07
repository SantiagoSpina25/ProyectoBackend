const express = require('express')


const { Router } = express;
const productosRouter = new Router();


// importamos la clase Container
const ContenedorArchivo = require('../containers/ContenedorArchivo')

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("./db/dbProductos.json")


// funcion Error
const crearErrorNoEsAdmin =(ruta, metodo) =>{
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

// Middleware para Administrador
const esAdmin = true

const soloAdmins = (req, res, next) => {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}


// Endpoints
productosRouter.get('/', async (req, res) => {

    ProductService.getAll().then(data=>{
        res.json(data)
    })
    
})


productosRouter.get('/:id', async (req, res) => {

    const id = Number(req.params.id)

    ProductService.getById(id).then(data=>{
        res.json(data)
    })

})


productosRouter.post('/', soloAdmins, async (req, res) => {

    ProductService.save(req.body)
    res.json("Producto subido al servidor con exito")

})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const { name, price, thumbnail, category, stock } = req.body
    const id = Number(req.params.id)
    const producto = {name: name, price: price, thumbnail: thumbnail, category: category, stock: stock}

    ProductService.getAll().then(newProductModify=>{
        let obj = newProductModify.find(obj => obj.id === Number(id))
        let index = newProductModify.indexOf(obj)

        let productModify = {...producto, id}
        if (!obj) {
            res.json({msg: "no se encontro el producto"})
            }else{
                ProductService.update(productModify, index)
                res.json("Producto modificado con exito")
            }
        })
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const id = Number(req.params.id)
    ProductService.deleteById(id)

    res.json("Producto eliminado del servidor con exito")
})


module.exports = productosRouter