/*
const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password:"senha",
    host: "localhost",
    port: 5432,
    database: 'qrmenu'
})

module.export = client;
*/

/*
let execute = (async () => {
    try {
        await client.connect()
        console.log("Connected Successfully  ")
        
    } 
    catch (error) {console.log(error)}
    finally{
        await client.end();
        console.log("Connection Ended")
    }


})();
*/
/*

// ESSE È MODO USANDO .THEN()
client.connect()
.then(()=> console.log('connect successfully'))
.then(() => client.query('insert into "EMPREGADO" values ($1,$2)', [2,'Maria']))
.then(() => client.query('select * from "EMPREGADO"'))
.then((res) => console.table(res.rows))
.catch(e = console.log)
.finally( () => client.end() )

//ESSE É MODO USANDO ASYNC
*/