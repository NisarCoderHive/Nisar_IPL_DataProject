const csv = require('csvtojson');

function matchesPlayedPerYear(matches){
    if (typeof matches === 'undefined' || matches.length == 0 ) {
        throw new Error("No Matches Data Passed");
      }
    try{
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
    try{
    matches = matches.filter(match => { if (match.season == year) return match['id'] }).map(m=>m.id);
    return deliveries.reduce((extraRunsConceded, delivery) => {
        if (delivery['match_id'] in matches) {
            const bowlingTeam = delivery['bowling_team'];
                     if(bowlingTeam in extraRunsConceded){
                       extraRunsConceded[bowlingTeam] += parseInt(delivery['extra_runs']) ;
                    }else{
                        extraRunsConceded[bowlingTeam] = parseInt(delivery['extra_runs']);
                    }
               }
            return extraRunsConceded;   
    },{});
    }catch(err){
        console.log(err)
    }
}
    
function topTenBowlers(matches,deliveries,year){
    let totalBowlers = {};
    try{
        matches = matches.filter(match => { if (match.season == year) return match['id'] }).map(m=>m.id);
        totalBowlers = deliveries.reduce((totalBowlers, delivery) => {
        if (delivery['match_id'] in matches) {
            const bowlerName = delivery.bowler;
                     if(bowlerName in totalBowlers){
                       totalBowlers[bowlerName] += parseInt(delivery['total_runs']) ;
                    }else{
                        totalBowlers[bowlerName] = parseInt(delivery['total_runs']);
                    }
               }
            return totalBowlers;   
    },{});
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
        var res= {}
        for(obj of finalresult){
        res[obj['BowlerName']]= obj['runs'];
        }

        return res;
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