const { resolve } = require('path')
const products = require('../product.json')
const uuid = require('uuid')
const {WriteDataToFile} = require('../utils')

// Suppose it is from database
function findAll()
{
    return new Promise( (resolve,reject) =>
    {
        resolve(products)
    })
}


function findById(id)
{
    return new Promise((resolve,reject) =>
    {
        console.log('Id recieved at model',id);
        
        const product = products.find(value =>  value.id == id)
        console.log('Product',product);
        
        resolve(product)
    })
}


function create(product)
{
    return new Promise( (resolve,reject) =>
    {   
        const id = uuid.v4()
        const newProd = { "id":id, ...product}

        products.push(newProd)
        WriteDataToFile('./product.json',products)
    
        resolve(newProd)
    })
}


function update(id,productData)
{
    return new Promise( (resolve,reject) =>
    {   
        // console.log('pr id',id,typeof(id));
        
        const index = products.findIndex( (p)=> p.id == id)
        
        // console.log('Product find at index ',index);
        // console.log('Product',products[index]);
        
        
        products[index] = {id,...productData}
        // console.log('After Product',products[index]);


        WriteDataToFile('./product.json',products)
    
        resolve(products[index])
        
    })
}

function remove(id)
{
    return new Promise( (resolve,reject) => {
        newproducts = products.filter( (p)=>p.id != id)
        console.log('all latest pr',newproducts);
        
        WriteDataToFile('./product.json',newproducts)
    
        resolve()
    })
}

module.exports =
{
    findAll,
    findById,
    create,
    update,
    remove
}