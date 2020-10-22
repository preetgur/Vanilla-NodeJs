const fs = require('fs')


function WriteDataToFile(filepath,content)
{
    fs.writeFileSync(filepath,JSON.stringify(content),'utf8',error => console.log('Error At appending data to json file',error)
    )
}

// From Body
function getPostData(req)
{
    return new Promise( (reslove,reject) =>
    {

        try {
            let body = ""

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end',()=>{
                reslove(body) // send data to await varible
            })


        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    WriteDataToFile,
    getPostData
}