// Top 10 Bowlers in 2016

const csv=require('csvtojson');

async function topTenBowlers(year){
let topTenBowlers = {};
let bowlers;
let results = [];
    try 
    {
        let matches = await csv().fromFile('../data/matches.csv');
        let deliveries = await csv().fromFile('../data/deliveries.csv');
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
        bowleRuns['runs'] = totalRuns;
        results.push(bowlerRuns);
        })
        
        results.sort((obj1,obj2) => obj1['runs']-obj2['runs'])
        console.log('Top 10 economical bowlers of 2016')
        for(let i = 0 ; i < 10 ; i++)
            console.log(results[i]);
       }
     catch(err){
         console.log(err)    
    }
  }



topTenBowlers(2016);
