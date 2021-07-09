const core = require('./core');

let matches = [{id : 1 , season : 2015, winner : 'Hyderabad'},
               {id : 2 , season : 2015, winner : 'Pune'},
               {id : 3 , season : 2015, winner : 'Hyderabad'}]
let deliveries = [
    {match_id : 1 ,bowler : 'Jadeja',extra_runs :4, bowling_team : 'Hyderabad'},
    {match_id : 1 ,bowler : 'Jadeja',extra_runs :4, bowling_team : 'Hyderabad'},
    {match_id : 2 ,bowler : 'Polard',extra_runs :4, bowling_team : 'Pune'},
];


test("should return {2015:3} when supplied with 3 matches data for season as 2015",()=>{
    expect(core.matchesPlayedPerYear(matches)).toStrictEqual({"2015":3})
});

test('Matches won per Team testing',()=>{
    expect(core.matchesWonPerTeam(matches)).toEqual({
        "2015":{"Hyderabad":2,"Pune":1}
    })
})

test('should throw an error if the matches object doesnot contain season property',()=>{
     expect(()=>{
        const matches = [{id : 1 , winner : 'Hyderabad'}]
        core.matchesPlayedPerYear(matches)}).toThrow("No Season Property")
});

test('Testing Extra runs conceded output',()=>{
    expect(core.runsConcededPerTeam(matches,deliveries,2015)).toEqual({
     "Hyderabad":8,"Pune":4    
    })
})

test("should throw an error if called without an arg", () => {
    expect( ()=> {core.matchesPlayedPerYear()}).toThrow("No Matches Data Passed")
  });

test("should throw an error if called without Matches data", () => {
    expect( ()=>{core.matchesPlayedPerYear([])}).toThrow("No Matches Data Passed")
}); 


test("should throw an eroor if called without an argument",()=>{
    expect(()=>{core.matchesWonPerTeam()}).toThrow("No Matches Data Passed")
}) 


test("Matcheswonperteam - should throw an error if called with Empty matches data",()=>{
    expect(()=>{ core.matchesWonPerTeam([]) } ).toThrow("No Matches Data Passed");
}
)
/*
test("should throw an error if called without an arg", () => {
    expect( ()=> {core.matchesPlayedPerYear()}).toThrow("No Matches Data Passed")
  })

test("should throw an error if called without Matches data", () => {
    expect( ()=>{core.matchesPlayedPerYear([])}).toThrow("No Matches Data Passed")
});
test("should throw an error if called without an arg", () => {
    expect( ()=> {core.matchesPlayedPerYear()}).toThrow("No Matches Data Passed")
  })

test("should throw an error if called without Matches data", () => {
    expect( ()=>{core.matchesPlayedPerYear([])}).toThrow("No Matches Data Passed")
});
test("should throw an error if called without an arg", () => {
    expect( ()=> {core.matchesPlayedPerYear()}).toThrow("No Matches Data Passed")
  })

test("should throw an error if called without Matches data", () => {
    expect( ()=>{core.matchesPlayedPerYear([])}).toThrow("No Matches Data Passed")
});
test("should throw an error if called without an arg", () => {
    expect( ()=> {core.matchesPlayedPerYear()}).toThrow("No Matches Data Passed")
  })

test("should throw an error if called without Matches data", () => {
    expect( ()=>{core.matchesPlayedPerYear([])}).toThrow("No Matches Data Passed")
});

*/