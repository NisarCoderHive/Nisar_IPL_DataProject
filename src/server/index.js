const getdata = require('./core');
const csv = require('csvtojson');
const fs = require('fs');
csv()
.fromFile('../data/matches.csv') // Promise To Retrieve the matches data 
.then((matches)=>{
  //write to matchesplayedperyear.json
   try{
        let output = getdata.matchesPlayedPerYear(matches);
        storeToJson(output,'../output/matchesPlayedPerYear.json')
        output = getdata.matchesWonPerTeam(matches)
        storeToJson(output,'../output/matchesWonPerTeamPerYear.json')
        }catch (err) {
        console.error(err)
      }
      csv()
      .fromFile('../data/deliveries.csv') // Promise To Retrieve the deliveries data
      .then((deliveries)=>{
        try{
           let output = getdata.runsConcededPerTeam(matches,deliveries,2016);
           storeToJson(output, '../output/extraRunsConcededPerTeam.json')
           output = getdata.topTenBowlers(matches,deliveries,2016);
           storeToJson(output, '../output/topTenBowlers.json')
        }catch(err){
           console.log(err)
        }
   });
});
// Function to store json data
const  storeToJson = (data,location)=>{
    try {
        fs.writeFileSync(location, JSON.stringify(data))
      } catch (err) {
        console.error(err);
      }
}
