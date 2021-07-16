const fs = require('fs');

const path = require('path');

const csv = require('csvtojson');

const getdata = require('./core');



csv()
.fromFile(path.resolve(__dirname,'../data/matches.csv')) // Promise To Retrieve the matches data 
.then((matches)=>{
  //write to matchesplayedperyear.json
   try{
        let output = getdata.matchesPlayedPerYear(matches);
        storeToJson(output, path.resolve(__dirname,'../output/matchesPlayedPerYear.json'))
        output = getdata.matchesWonPerTeam(matches)
        storeToJson(output, path.resolve(__dirname,'../output/matchesWonPerTeamPerYear.json'))
        }catch (err) {
        console.error(err)
      }
      csv()
      .fromFile(path.resolve(__dirname,'../data/deliveries.csv')) // Promise To Retrieve the deliveries data
      .then((deliveries)=>{
        try{
           let output = getdata.runsConcededPerTeam(matches,deliveries,2016);
           storeToJson(output, path.resolve(__dirname,'../output/extraRunsConcededPerTeam.json'))
           output = getdata.topTenBowlers(matches,deliveries,2016);
           storeToJson(output, path.resolve(__dirname,'../output/topTenBowlers.json'))
        }catch(err){
           console.log(err)
        }
   });
});

// Function to store json data
const  storeToJson = (data,location)=>{
    try {
         fs.writeFile(location, JSON.stringify(data),(err)=>{console.log(err)})
      } catch (err) {
        console.error(err);
      }
}
