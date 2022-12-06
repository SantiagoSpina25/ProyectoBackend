const express = require('express')


const { Router } = express;
const carritosRouter = new Router();


// importamos la clase Container
const ContenedorArchivo = require('../containers/ContenedorArchivosCarritos')

// Se instancia la clase contenedor
const ProductService = new ContenedorArchivo("./db/dbCarritos.json")



// Endpoints

//Devuelve todos los carritos
carritosRouter.get("/", async (req,res) => {

    ProductService.getAll().then(data=>{
        res.json(data)
    })
})

//Devuelve un carrito con el id dado
carritosRouter.get("/:id", async (req,res) => {
    const id = Number(req.params.id)
    ProductService.getById(id).then(data=>{
        res.json(data)
    })
})

//Crea un nuevo carrito
carritosRouter.post('/', async (req, res) => {
    
    ProductService.save(req.body)
    res.json("Nuevo carrito subido al servidor con exito")

})


//Borra un carrito
carritosRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    ProductService.deleteById(id)

    res.json("Carrito eliminado del servidor con exito")
})

//Accede a los productos de un carrito 
carritosRouter.get('/:id/products', async (req, res) => {
    const id = Number(req.params.id)
    ProductService.getCartProducts(id).then(data=>{
        res.json(data)

    })
})

//Ingresa productos a un carrito
carritosRouter.post('/:id/products', async (req, res) => {

    const id = Number(req.params.id)
    ProductService.addProductToCart(req.body, id)

    res.json("Producto añadido al carrito correctamente")
})

//Borra un producto en especifico dentro de un carrito
carritosRouter.delete('/:id/products/:id_prod', async (req, res) => {
    const id = Number(req.params.id)
    const id_prod = Number(req.params.id_prod)

    ProductService.deleteProductById(id, id_prod)
    res.json("Producto elminado con exito")
    
})

module.exports = carritosRouter