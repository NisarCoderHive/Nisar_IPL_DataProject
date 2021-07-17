const fs = require("fs");

const Pool = require("pg").Pool;

const fastcsv = require("fast-csv");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "IPL",
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
      csvData.shift(); // TO remove header information of csv file
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach(row => {
          client.query(query, row, (err, res) => {
          if(err) {
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
    }catch(err){
      console.log(err)
      }
    finally{
      done();
     }
    });
  }
 
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
 
module.exports ={executeQuery,
store,
creatTable
}