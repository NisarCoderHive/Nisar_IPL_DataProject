function matchesWonPerYear(){
fetch('/matchesPlayedPerYear.json')
    .then((response)=> {
        return response.json();
    })
    .then((data)=> {
        let array=[]
            for(let year in data){
                 array.push([year,data[year]])
            }
           
            Highcharts.setOptions({
                chart: {
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(240, 240, 255)']
                        ]
                    },
                    borderWidth: 2,
                    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
                    plotShadow: true,
                    plotBorderWidth: 1
                }
            });
            

            Highcharts.chart('chart1', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Number of Matches Played Per Year',
                    style: {
                        fontSize: '2em',
                        color: 'brown'
                    }
                },
               
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: 0,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif',
                            color:'blue'
                        }
                    }
                }, 
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Matches Played'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Matches: <b>{point.y}</b>'
                },
                series: [{
                    name: 'Number Of Matches',
                    data: array,
                    color:'blue'
                  ,
                }]
            });

       // viewData(data);
    })
    .catch((err)=> {
        console.log('error: ' + err);
    });
}
matchesWonPerYear();


function matchesWonPerTeamPerYear(){
    fetch('/matchesWonPerTeamPerYear.json')
        .then((response)=> {
            return response.json();
        })
        .then((data)=> {
            let array=[]
                for(let year in data["2015"]){
                    // let t=[];
                    // for(let team in data[year]){
                    //     t.push(team)
                    // }
                        
                    array.push([year,data["2015"][year]])
                    
                }
                let array1=[]
                for(let year in data["2013"]){
                    // let t=[];
                    // for(let team in data[year]){
                    //     t.push(team)
                    // }
                        
                    array1.push([year,data["2013"][year]])
                    
                }
                Highcharts.setOptions({
                    chart: {
                        backgroundColor: {
                            linearGradient: [0, 0, 500, 500],
                            stops: [
                                [0, 'rgb(255, 255, 255)'],
                                [1, 'rgb(240, 240, 255)']
                            ]
                        },
                        borderWidth: 2,
                        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
                        plotShadow: true,
                        plotBorderWidth: 1
                    }
                });
                
    
                Highcharts.chart('chart2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Matches Won By each Team in 2015 vs 2013',
                        style: {
                            fontSize: '2em',
                            color: 'brown'
                        }
                    },
                   
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: 0,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif',
                                color:'blue'
                            }
                        }
                    }, 
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Matches Won '
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    tooltip: {
                        pointFormat: '<b>{point.y}</b>'
                    },
                    series: [{
                        name: '2015',
                        data: array, 
                        color:'blue'
                      
                    },{
                        name: '2013',
                        data: array1, 
                        color:'red'
                      
                    }],
                    
                });
    
           // viewData(data);
        })
        .catch((err)=> {
            console.log('error: ' + err);
        });
    }
    matchesWonPerTeamPerYear();


    function topTenBowlers(){
        fetch('/topTenBowlers.json')
            .then((response)=> {
                return response.json();
            })
            .then((data)=> {
                let array= [];
                    for(let index in data){
                        
                       array.push([index,data[index]])
                       
                     }
                   
                    Highcharts.setOptions({
                        chart: {
                            backgroundColor: {
                                linearGradient: [0, 0, 500, 500],
                                stops: [
                                    [0, 'rgb(255, 255, 255)'],
                                    [1, 'rgb(240, 240, 255)']
                                ]
                            },
                            borderWidth: 2,
                            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
                            plotShadow: true,
                            plotBorderWidth: 1
                        }
                    });
                    
        
                    Highcharts.chart('chart3', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Top Ten Bowlers ipl',
                            style: {
                                fontSize: '2em',
                                color: 'brown'
                            }
                        },
                       
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: 0,
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif',
                                    color:'blue'
                                }
                            }
                        }, 
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Economy'
                            }
                        },
                        legend: {
                            enabled: true
                        },
                        tooltip: {
                            pointFormat: 'Economy: <b>{point.y}</b>'
                        },
                        series: [{
                            name: 'Economy',
                            data: array,
                            color:'blue'
                          ,
                        }]
                    });
        
               // viewData(data);
            })
            .catch((err)=> {
                console.log('error: ' + err);
            });
        }
        topTenBowlers();

