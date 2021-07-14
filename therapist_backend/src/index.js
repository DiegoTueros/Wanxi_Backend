const app = require('./app');
const { connect } = require ('./database')


async function main(){
   //Database connection
   await connect();
   //Express aplication
   await app.listen(4000)
   console.log("Server on localhost: 4000")
   
   //console.log('server on port 6000: Connected')
}


main();