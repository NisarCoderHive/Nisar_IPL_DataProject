const csv = require('csvtojson');

function matchesPlayedPerYear(matches){
 try 
    {
        return matches.reduce((matchesPerYear, match) => {
            const season = match.season;
            if (matchesPerYear.hasOwnProperty(season)) {
              matchesPerYear[season] += 1;
            } else {
              matchesPerYear[season] = 1;
            }
            return matchesPerYear;
          }, {});
    }
    catch(err){
        console.log(err)    
    }

}

function matchesWonPerTeam(matches){
    try{ 
        return  matches.reduce((matchesWon, match)=>{
        const year = match.season ;
        if(matchesWon.hasOwnProperty(year)){
            const team = match.winner ;
            if(matchesWon[year].hasOwnProperty(team))
            {
                matchesWon[year][team] += 1;
            }
            else{
                matchesWon[year][team] = 1;
            }
        }
        else{
            const team = match.winner ;
            matchesWon[year] = {};
            matchesWon[year][team] = 1;
        }
        return matchesWon;
    },{});
}catch(err){
    console.log(err)    
    }
}

function runsConcededPerTeam(matches, deliveries ,year){
    let extraRunsConceded = {};
    try 
        {
            matche = matches.filter( match =>  match.season == year);
            matche.forEach(match =>{
            deliveries.forEach(delivery =>{
                  if(match.id == delivery.match_id){
                      const bowlingTeam = delivery.bowling_team;
                    if(extraRunsConceded.hasOwnProperty(bowlingTeam)){
                        extraRunsConceded[bowlingTeam] += parseInt(delivery['extra_runs']) ;
                        }else{
                            extraRunsConceded[bowlingTeam] = parseInt(delivery['extra_runs']);
                        }
                  }
                });
            });
        }
        catch(err){
            console.log(err)    
        }
        return extraRunsConceded;

}
    
function topTenBowlers(matches,deliveries,year){
    let totalBowlers = {};
    try{
        matches = matches.filter( match =>  match['season'] == year );
            matches.forEach(match =>{
                deliveries.forEach(delivery =>{
                    if(match.id == delivery.match_id){
                        const bowlerName = delivery.bowler;
                        if(totalBowlers.hasOwnProperty(bowlerName)){
                            totalBowlers[bowlerName] += Number(delivery.total_runs)
                        }else{
                            totalBowlers[bowlerName] = Number(delivery.total_runs)
                        }
                }
            });
        });
        let result =[];
        for (const [key, value] of Object.entries(totalBowlers)) {
            let obj={};
            obj['BowlerName']= key ;
            obj['runs'] = value;
            result.push(obj)
        }
        result.sort((obj1,obj2) =>obj1['runs'] -obj2['runs']);
        let finalresult = [];
        for( i = 0 ;i < 10 ;i++){
            finalresult.push(result[i])
        }
        return finalresult;
        }catch(err){
                 console.log(err)    
            }
    }

module.exports ={
 matchesPlayedPerYear,
 matchesWonPerTeam,
 topTenBowlers,
 runsConcededPerTeam   
}