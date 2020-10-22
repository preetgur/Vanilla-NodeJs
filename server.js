const {getProducts,getSingleProduct,createProduct,updateProduct,deleteProduct} = require('./controllers/productController')
const http = require('http')

const server = http.createServer( ( req,res) => {

    if (req.url === "/api" && req.method === 'GET')
    {
       getProducts(req,res)
    }

    else if (req.url === "/api" && req.method === 'POST')
    {
       createProduct(req,res)
    }


    else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]   //    /api/products/1
        
       getSingleProduct(req,res,id)
    }

    else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]   //    /api/products/1
        
       updateProduct(req,res,id)
    }

    else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]   //    /api/products/1
        
       deleteProduct(req,res,id)
    }

    else 
    {
        res.writeHead(404,{'Content-Type':"application/json"})
        res.end(JSON.stringify( {"message":"404 Route Not Found"}))
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>console.log(`Server is running at port ${PORT} `)
)

