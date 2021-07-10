const http = require('http');
const fs = require('fs');
const { url } = require('inspector');
const server = http.createServer((request,response)=>{
    if(request.url == "/"){
        let result = getContent("../public/index.html")
        .then((content)=>{
            response.writeHead(200,{'Content-Type':'text/html'})
            response.write(content);
            response.end();
        })
        .catch((err)=>{
            errorHandler(res,err)
        })
   }
   else if(request.url == '/style.css'){
    let result = getContent("../public/style.css")
    .then((content)=>{
        response.writeHead(200,{'Content-Type':'text/css'})
        response.write(content);
        response.end();
       
    })
    .catch((err)=>{
        errorHandler(res,err)
    })
   }
   else if(request.url == "/matchesPlayedPerYear.json"){
    let result = getContent("../output/matchesPlayedPerYear.json")
    .then((content)=>{
        response.writeHead(200,{'Content-Type':'application/json'})
        response.write(content);
        response.end();
    })
    .catch((err)=>{
        errorHandler(res,err)
    })
    }
    else if(request.url == "/app.js"){
    let result = getContent("../public/app.js")
    .then((content)=>{
        response.writeHead(200,{'Content-Type':'text/javascript'})
        response.write(content);
        response.end();
    })
    .catch((err)=>{
        errorHandler(res,err)
    })
    }
    else{
        response.writeHead(404,{'Content-Type':'text/html'})
        response.write("<h1><center> Page Not Found</center></h1>")
    }
})

let getContent = (location)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(location,'utf8',(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
                
            } 
        })
   });
}

server.listen(3000);
console.log('Server Started')
