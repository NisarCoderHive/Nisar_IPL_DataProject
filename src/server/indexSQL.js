const fs = require("fs");

const Pool = require("pg").Pool;

const fastcsv = require("fast-csv");

const sql = require('./coreSQL');

const sqlObject= {
  "createMatchesTable" : "CREATE TABLE IF NOT EXISTS matches2(id numeric, season varchar, city varchar ,date date,team1 varchar,team2 varchar, toss_winner varchar, toss_decision varchar,result varchar,dl_applied numeric,winner varchar,win_by_runs numeric, win_by_wickets numeric, player_of_match varchar,venue varchar,umpire1 varchar, umpire2 varchar,umpire3 varchar)" ,
  "createDeliveriesTable" : "CREATE TABLE IF NOT EXISTS deliveries2(matchid numeric,inning   numeric,batting_team  varchar, bowling_team varchar,over numeric,ball numeric,batsman varchar,non_striker varchar, bowler varchar, is_super_over numeric,wide_runs numeric,bye_runs numeric,legbye_runs numeric,noball_runs numeric,penalty_runs numeric,batsman_runs numeric,extra_runs numeric,total_runs numeric,player_dismissed varchar,dismissal_kind varchar,fielder varchar)",
  "insertDeliveries" :{csvfile : "../data/deliveries.csv", query:"INSERT INTO deliveries2 VALUES ($1,$2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)"},
  "insertMatches" : {csvfile : "../data/matches.csv", query:"INSERT INTO matches2 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)"},
  "query1" : `select season, count(*) as "Numberofmatchesplayed" from matches group by season`,
  "query2" : `select season, winner as "Team", count(*) as "Matcheswon" from matches group by season,winner order by season`,
  "query3" : `select bowling_team, sum(extra_runs) as "ExtraRunsconceded" from matches  inner join deliveries on matches.id=deliveries.matchid where season='2016' group by deliveries.bowling_team`,
  "query4" : `select  bowler,sum(total_runs) as "total" from deliveries inner join matches on id=matchid where season='2015' group by bowler order by total limit 10`
}


sql.creatTable(sqlObject.createMatchesTable);

sql.creatTable(sqlObject.createDeliveriesTable);


sql.store(sqlObject.insertDeliveries.csvfile,sqlObject.insertDeliveries.query);

sql.store(sqlObject.insertMatches.csvfile,sqlObject.insertMatches.query);

sql.executeQuery(sqlObject.query1)
.then(matchesPlayedPerYear =>{
  console.log(matchesPlayedPerYear.rows);
})
.catch(err=> console.log(err))

sql.executeQuery(sqlObject.query2)
.then(matchesWonPerTeamPerYear =>{
  console.log(matchesWonPerTeamPerYear.rows);
})
.catch(err=> console.log(err))

sql.executeQuery(sqlObject.query1)
.then(matchesPlayedPerYear =>{
  console.log(matchesPlayedPerYear.rows);
})
.catch(err=> console.log(err))

sql.executeQuery(sqlObject.query2)
.then(matchesWonPerTeamPerYear =>{
  console.log(matchesWonPerTeamPerYear.rows);
})
.catch(err=> console.log(err))

sql.executeQuery(sqlObject.query3)
.then(extraRunsConcededPerTeam=>{
  console.log(extraRunsConcededPerTeam.rows);
})
.catch(err=> console.log(err))

sql.executeQuery(sqlObject.query4)
.then(topTenBowlers =>{
  console.log(topTenBowlers.rows);
})
.catch(err=> console.log(err))

