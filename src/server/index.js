const getdata = require('./core');
const csv = require('csvtojson');
const fs = require('fs');



csv()
.fromFile('../data/matches.csv') // Promise To Retrieve the matches data 
.then((results)=>{

    //write to matchesplayedperyear.json
    getdata.matchesPlayedPerYear(results)
    .then(output =>
    {
        try {
            storeToJson(output,'../output/matchesPlayedPerYear.json')
        } catch (err) {
        console.error('error -  writing To File',err)
      }
   });


   //write to matcheswonperteam.json
   getdata.matchesWonPerTeam(results)
   .then(output =>
   {
       try {
           storeToJson(output,'../output/matchesWonPerTeamPerYear.json')
       } catch (err) {
       console.error('error occurred at writing file',err)
     }
  });

  // Extra runs conceded per team to json file
csv()
.fromFile('../data/deliveries.csv') // Promise To Retrieve the deliveries data
.then((deliveries)=>
   {
       try{
           let output = getdata.runsConcededPerTeam(results,deliveries,2016);
           storeToJson(output, '../output/extraRunsConcededPerTeam.json')
       }
       catch(err){
           console.log(err)
       }
   });
// Top Ten bowlers to json file
csv()
.fromFile('../data/deliveries.csv') // Promise To Retrieve the deliveries data
.then((deliveries)=>
   {
       try{
           let output = getdata.topTenBowlers(results,deliveries,2016);
           storeToJson(output, '../output/topTenBowlers.json')
       }
       catch(err){
           console.log(err)
       }
   });


});



// Function to store json data

const  storeToJson = (data,location)=>{
    try {
        //console.log(JSON.stringify(data));
         fs.writeFileSync(location, JSON.stringify(data))
      } catch (err) {
        console.error('error is occurred at writing file',err)
      }
       
}










// let results;
// async function getMatchesData(){
//      results = await csv().fromFile('../data/matches.csv');
// why this didnot work
// }
// getMatchesData();
// console.log(results);
// console.log(getdata.matchesPlayedPerYear(results));