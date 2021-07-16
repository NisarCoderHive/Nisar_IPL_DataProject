const http = require('http');

const path = require('path');

const fs = require('fs');

const URL = 
    { "/"         : { location :"../public/index.html",
                     type : {'Content-Type':'text/html'}} ,
     "/style.css" : { location :"../public/style.css",
                      type : {'Content-Type':'text/css'}},
     "/matchesPlayedPerYear.json" : { location :"../output/matchesPlayedPerYear.json",
                                       type : {'Content-Type':'application/json'}},
     "/extraRunsConcededPerTeam.json" : { location :"../output/extraRunsConcededPerTeam.json",
                                    type : {'Content-Type':'application/json'}},
     "/matchesWonPerTeamPerYear.json" : { location :"../output/matchesWonPerTeamPerYear.json",
                                       type : {'Content-Type':'application/json'}},
     "/topTenBowlers.json" : { location :"../output/topTenBowlers.json",
                                       type : {'Content-Type':'application/json'}},
     "/app.js" : { location :"../public/app.js",
                        type : {'Content-Type':'text/javascript'}}
}

const server  = http.createServer((request,response)=>{
    let requrl= request.url;
    if(URL.hasOwnProperty(requrl) )
    {
     let result = getContent(URL[requrl].location)
        .then((content)=>{
            response.writeHead(200,URL[requrl].type)
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
        fs.readFile(path.resolve(__dirname,location),'utf8',(err,data)=>{
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
console.log('Server Running.......')
