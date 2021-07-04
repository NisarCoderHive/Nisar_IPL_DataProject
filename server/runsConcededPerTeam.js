// Extra Runs conceded Per Team in 2016
const csv=require('csvtojson');

async function runsConcededPerTeam(year){
let runsExtraConcededPerTeam = {};
  
    try 
    {
        let matches = await csv().fromFile('../data/matches.csv');
        let deliveries = await csv().fromFile('../data/deliveries.csv');
        matches = matches.filter( match => { if( match.season == year ) return match['id']});
        let deliveriesYear= [];
        matches.forEach(match =>{
            for(let i = 0 ; i < deliveries.length ;i++)
            {
                if( match['id'] == deliveries[i]['match_id'] )
                    deliveriesYear.push(deliveries[i])
            }
            
        });

        deliveries = deliveriesYear ;
        let bowlingTeams = deliveries.map(matchId => matchId['bowling_team']);
        bowlingTeams = new Set(bowlingTeams);
        bowlingTeams.forEach( bowlingTeam => {
            let sum = 0;
            for( let j = 0 ; j < deliveries.length  ; j++)
             {
                if( bowlingTeam == deliveries[j]['bowling_team'] ){
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
