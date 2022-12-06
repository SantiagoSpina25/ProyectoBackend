const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(path) {
        this.path = path;
    }

    async getById(id) {
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)

            const cartFind = data.find(cart => cart.id === id)
            
            if(!cartFind){
                return null
            }
            return cartFind
            
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        const read = await fs.readFile(this.path, "utf-8")
        return JSON.parse(read)
    }

    async getCartProducts(id){
        const read = await fs.readFile(this.path, "utf-8")
        const data =  JSON.parse(read)

        const cartFind = data.find(cart => cart.id === id)

        const products = cartFind.products
        return products
    }

    async save(object){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(read)

            let id
            data.length === 0 ? id = 1 : id =  data[data.length - 1].id + 1
            const newCart ={...object, id}
            data.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8")
            return newCart.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(object, id){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)

            const cartFind = data.find(cart => cart.id === id)
            const products = cartFind.products

            let id_prod
            products.length === 0 ? id_prod = 1 : id_prod =  products[products.length - 1].id_prod + 1
            const newProduct ={...object, id_prod}
            products.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(data), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteProductById(id, id_prod){
        try{
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)
    
            const cartFind = data.find(cart => cart.id === id)
            const products = cartFind.products
    
            const productFilter = products.filter(prod => prod.id_prod != id_prod)

            fs.writeFile(this.path, JSON.stringify(data), "utf-8")

        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            const read = await fs.readFile(this.path, "utf-8")
            const data =  JSON.parse(read)

            const objFilter = data.filter(cart => cart.id != id)
            fs.writeFile(this.path, JSON.stringify(objFilter), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = ContenedorArchivo