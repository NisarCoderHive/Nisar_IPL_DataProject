
const csv=require('csvtojson');

async function matchesWonPerTeam(){

    let matchesWonPerTeamPerYear = {};
    try 
    {
        const matches = await csv().fromFile('../data/matches.csv');

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
console.log('Matches Won Per Team Per Year')
console.log(matchesWonPerTeamPerYear )
}



matchesWonPerTeam()
