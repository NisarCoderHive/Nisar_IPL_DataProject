const fs = require("fs");

const Pool = require("pg").Pool;

const fastcsv = require("fast-csv");



const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "exercises",
  password: "postgres",
  port: 5432,
 idleTimeoutMillis: 0,
  connectionTimeoutMillis: 50000
});
 
function store(csvfile,query){

let stream = fs.createReadStream(csvfile);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();
    // create a new connection to the database
    //const query =
      //"INSERT INTO deliveries1 VALUES ($1,$2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)"
    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
            client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:");
            }
          });
        });
      }catch(err)
      {
        console.log(err);
      } 
      finally {
   //     pool.end();
        done();
      }
    });
  });
stream.pipe(csvStream); // pipe method is used to take a readable stream and connect to writable stream
}





function creatTable(createTableCommand){
  pool.connect((err,client,done)=>{
    try{
    client.query(createTableCommand,(error,result)=>{
      if(error){
        throw error;
      }
      else
      {
        console.log('Table Created')
      }

    });
    
  }
  catch(err){
    console.log(err)
  }
  finally{
    done();
   }
  });
  }
 


//creatTable(sqlObject.createMatchesTable);

//creatTable(sqlObject.createDeliveriesTable);


//store(sqlObject.insertDeliveries.csvfile,sqlObject.insertDeliveries.query);

//store(sqlObject.insertMatches.csvfile,sqlObject.insertMatches.query);


function executeQuery(queryText){
    return new Promise((resolve,reject) => {
      pool.connect((err,client,done)=>{
        try{
      client.query(queryText, 
          (error, queryOutput) => {
            if(error){
              return reject(error)
            } else{
              return resolve(queryOutput)
            }

        });}
        catch(err){
          console.log(err);
        }
        finally{
          done();
        }
      })
     })
  }
  
  
  executeQuery(sqlObject.query4)
  .then(data =>{
    console.log(data.rows);
  })
  .catch(err=> console.log(err))



module.exports ={executeQuery,
store,
creatTable
}