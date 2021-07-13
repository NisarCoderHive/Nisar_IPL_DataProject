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
            viewChart(array,'chart1',"Matches Played In Each Year","Number of Matches")
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
            var series = [];
            var seriesObj={};
            var catArray =[]
            for(const [dat,dataobj] of Object.entries(data))
            {
                catArray.push(dat);
                for(const [team,numwon] of Object.entries(dataobj)){
                if(seriesObj.hasOwnProperty(team))
                {
                  seriesObj[team]['data'].push(numwon)
                }
                else{
                  seriesObj[team]={name:'',data:[]};
                  seriesObj[team]['name']=team;
                  seriesObj[team]['data'].push(numwon)
                }
                }
          }
            
            for(const [t,obj] of Object.entries(seriesObj)){
              series.push(obj)
            }
            Highcharts.chart('chart2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Matches  Won Per Each Team '
                    },
                    xAxis: {
                        categories: catArray
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Matches Won'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: ( // theme
                                    Highcharts.defaultOptions.title.style &&
                                    Highcharts.defaultOptions.title.style.color
                                ) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: series
                });
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
                     viewChart(array,'chart3','Top Ten Bowlers of 2016',"Economy")
              })
            .catch((err)=> {
                console.log('error: ' + err);
            });
        }
topTenBowlers();

function extraRunsConceded(){
            fetch('/extraRunsConcededPerTeam.json')
                .then((response)=> {
                    return response.json();
                })
                .then((data)=> {
                    let array=[]
                        for(let year in data){
                             array.push([year,data[year]])
                        }
                  viewChart(array,"chart4","Extra Runs Conceded By Each Team in 2016","Extra Runs")
                })
                .catch((err)=> {
                    console.log('error: ' + err);
                });
}
extraRunsConceded();

function viewChart(array,chartid,chartTitle,yaxisTitle)
            {
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
                Highcharts.chart(chartid, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: chartTitle,
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
                            text: yaxisTitle
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '<b>{point.y}</b>'
                    },
                    series: [{
                        name: 'Number Of Matches',
                        data: array,
                        color:'blue'
                      
                    }]
                });
            }