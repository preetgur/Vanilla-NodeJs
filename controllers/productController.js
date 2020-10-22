const productModel = require('../models/productModel')

const {getPostData} = require('../utils')

async function getProducts(req,res)
{
    try {
        const products = await ProductModel.findAll()
        
        res.writeHead(200,{'Content-Type':"application/json"})
        res.end(JSON.stringify(products))

    } catch (error) {
        console.log(error);
        
    }
}


async function getSingleProduct(req,res,id)
{
    try {
        console.log(" single id ",id)
        const product = await ProductModel.findById(id)
        
        if(!product)
        {
            res.writeHead(200,{'Content-Type':"application/json"})
            res.end(JSON.stringify({'message':"Product Not Found"}))
        }
        else
        {
            res.writeHead(200,{'Content-Type':"application/json"})
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error);
        
    }
}


async function createProduct(req,res)
{
    try {


        // const product = {
        //     "name":"xyz",
        //     "description":"Jkl",
        //     "price":999
        // }

        // const newProduct = await ProductModel.create(product)

    const body = await getPostData(req)      
    const {name,description,price} = JSON.parse(body)

    const product = {
    "name":name,
    "description":description,
    "price":price
}
    const newProduct = await ProductModel.create(product)

    res.writeHead(200,{'Content-Type':"application/json"})
    res.end(JSON.stringify(newProduct))  

    } catch (error) {
        console.log(error);
        
    }
}


async function updateProduct(req,res,id)
{
    try {
        console.log('id from server ',id);
        
    const product = await ProductModel.findById(id);
    console.log('Product To be updated ',product);
    

    if(!product)
    {
        res.writeHead(404,{'Content-Type':"application/json"})
        res.end(JSON.stringify({"message":"Product not found"}))  

    }

    else {

        const body = await getPostData(req)       // get the data from body
        const {name,description,price} = JSON.parse(body)
    
        const productData = {
            "name":name ||product.name,
            "description":description ||product.description,
            "price":price|| product.price
            }

        const updatedProduct = await ProductModel.update(id,productData) 

        res.writeHead(200,{'Content-Type':"application/json"})
        res.end(JSON.stringify(updatedProduct))  
        }
    } catch (error) {
        console.log(error);
        
    }
}


async function deleteProduct(req,res,id)
{
    try {
        console.log(" single id ",id)
        const product = await ProductModel.findById(id)
        
        if(!product)
        {
            res.writeHead(200,{'Content-Type':"application/json"})
            res.end(JSON.stringify({'message':"Product Not Found"}))
        }
        else
        {   
            await productModel.remove(id)
            res.writeHead(200,{'Content-Type':"application/json"})
            res.end(JSON.stringify({"message":`Product with id ${id} has been removed `}))
        }

    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}