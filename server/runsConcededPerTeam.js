
const csv=require('csvtojson');

async function runsConcededPerTeam(year){
let runsExtraConcededPerTeam = {};
  
    try 
    {
        const matches = await csv().fromFile('../data/matches.csv');
        const deliveries = await csv().fromFile('../data/deliveries.csv');

        let matchIds = matches.filter( match => match.season == year );
        let bowlingTeams = deliveries.map(matchId => matchId['bowling_team']);
        bowlingTeams = new Set(bowlingTeams);
        console.log(bowlingTeams);
        bowlingTeams.forEach( bowlingTeam => {
            
            let sum = 0;
            
            for( let j = 0 ; j < deliveries.length  ; j++)
             {
                if( bowlingTeam == deliveries[j]['bowling_team'] && ){
                    sum = sum + Number(deliveries[j]['extra_runs'])
                
              }
            }
            runsExtraConcededPerTeam[bowlingTeam] = sum ;
            });
        
   
}
    catch(err){
        console.log(err)    
    }
    console.log('Extra Runs Conceded Per Each Team in ', year)
    console.log(runsExtraConcededPerTeam )
}



runsConcededPerTeam(2016)
