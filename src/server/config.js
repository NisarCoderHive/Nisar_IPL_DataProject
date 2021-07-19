// require('dotenv').config();


// const connection ={
//   host: 'localhost',
//   user: 'postgres',
//   database: 'exercises',
//   password: 'postgres',
//   port: 5432,
//   idleTimeoutMillis: 0,
//   connectionTimeoutMillis: 50000
// }

// module.exports = connection;
const path = require('path')
const dotenv=require('dotenv')
const p = path.resolve(__dirname,'./.env')
dotenv.config({
  path:p
  }) 

module.exports={
   PORT:process.env.PORT,
   HOST:process.env.HOST,
   USER:process.env.USR,
   PASSWORD:process.env.PWD,
   DATABASE : process.env.DATABASE
   }
