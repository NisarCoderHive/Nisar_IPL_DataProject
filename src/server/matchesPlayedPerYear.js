
const csv=require('csvtojson');
const fs = require('fs')
async function matchesPlayedPerYear(){

    let finalresult = {};
    try 
    {
        const results=await csv().fromFile('../data/matches.csv');
        let years = results.map(data =>data.season)
        
        years = new Set(years); 
        years.forEach(year =>{
         let count=0;
            for(let j=0 ; j < results.length  ; j++)
             {
                if(year == results[j]['season']){
                count++;
              }
            }
        finalresult[year]= count;
    });
}
    catch(err){
        console.log(err)    
    }
    
console.log(typeof finalresult)
console.log(finalresult)
fs.writeFileSync('../output/a.json', JSON.stringify(finalresult))
}

matchesPlayedPerYear();



