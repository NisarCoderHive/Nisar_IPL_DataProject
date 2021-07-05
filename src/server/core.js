const csv = require('csvtojson');

async function matchesPlayedPerYear(results){
//remove async
    let finalresult = {};
    try 
    {
        //const results=await csv().fromFile('../data/matches.csv');
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
return finalresult;
}


async function matchesWonPerTeam(matches){

    let matchesWonPerTeamPerYear = {};
    try 
    {
        //const matches = await csv().fromFile('../data/matches.csv');

        let years = matches.map( match => match.season)
        
        let winnerTeams = matches.map( match => match.winner)

        winnerTeams =new Set(winnerTeams)

        years = new Set(years);

        console.log(years) ;
        let countWinnerTeam = {}; 

        years.forEach( year => {
            winnerTeams.forEach( team => {
            let count = 0;
            
            for( let j=0 ; j < matches.length  ; j++)
             {
                if( year == matches[j]['season'] && team == matches[j]['winner']){
                     count++;
              }
              
            }
            if( count != 0 )
             countWinnerTeam[team] = count;
        });
        matchesWonPerTeamPerYear [year]= countWinnerTeam;
    });
}
    catch(err){
        console.log(err)    
    }

return matchesWonPerTeamPerYear  ;
}

function runsConcededPerTeam(matches, deliveries ,year){
    let runsExtraConcededPerTeam = {};
      
        try 
        {
            //let matches = await csv().fromFile('../data/matches.csv');
            //let deliveries = await csv().fromFile('../data/deliveries.csv');
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
        
        return runsExtraConcededPerTeam ;
    }

    
    function topTenBowlers(matches,deliveries,year){
        let topTenBowlers = {};
        let bowlers;
        let results = [];
            try 
            {
                //let matches = await csv().fromFile('../data/matches.csv');
                //let deliveries = await csv().fromFile('../data/deliveries.csv');
                matches = matches.filter( match =>  match['season'] == year );
                /*matchIds.forEach(matchID =>
                    deliveries = deliveries.filter(delivery => delivery['id'] == matchID['match_id']));*/
                let deliveriesYear= [];
                matches.forEach(match =>{
                        for(let i = 0 ; i < deliveries.length ;i++)
                        {
                            if( match['id'] == deliveries[i]['match_id'] )
                                deliveriesYear.push(deliveries[i])
                        }
                        
                });
                deliveries = deliveriesYear ;
                let bowlers = deliveries.map(delivery => delivery['bowler'])
                bowlers = new Set(bowlers)
                bowlers.forEach(bowler => {
                let totalRuns = 0;
                let bowlerRuns = {};
                for(let i = 0 ; i < deliveries.length ; i++){
                    if(deliveries[i]['bowler'] == bowler )
                            {
                                totalRuns += Number(deliveries[i]['total_runs']);
                            }
                        }
                bowlerRuns['bowler'] = bowler;
                bowlerRuns['runs'] = totalRuns;
                results.push(bowlerRuns);
                })
                
                results.sort((obj1,obj2) => obj1['runs']-obj2['runs'])
                let outputResults = [];
                // console.log('Top 10 economical bowlers of 2016')
                for(let i = 0 ; i < 10 ; i++){
                    outputResults.push(results[i]);
                }
                    return outputResults ;
                }
               
             catch(err){
                 console.log(err)    
            }
          }
        


module.exports ={
 matchesPlayedPerYear,
 matchesWonPerTeam,
 topTenBowlers,
 runsConcededPerTeam   
}