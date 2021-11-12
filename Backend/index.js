require('dotenv').config()
const express = require("express")
const app = express();
const cors = require("cors");

const {Pool} = require('pg')
const client = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
})


//middleware
app.use(cors());
app.use(express.json());

//Routes//

//get a menu

app.get("/api/:nomeRestaurante", async (req,res) =>{
    try {

        const { nomeRestaurante} = req.params;
        const idCardapio = await (await client.query('SELECT cod_cardapio FROM restaurante where nome_restaurante = $1',[nomeRestaurante])).rows[0].cod_cardapio
        const restaurante = await client.query("SELECT * from produto where cod_Cardapio = $1;", [idCardapio])
        
        res.json(restaurante.rows)
        
    } 
    catch (error) {console.log(error)}

})

//get a categoria 

app.get("/api/:nomeRestaurante/categoria", async (req,res) =>{
    try {

        const restaurante = await client.query("SELECT * from categoria ")
        res.json(restaurante.rows)
        
    } 
    catch (error) {console.log(error)}

})



const PORT = process.env.PORT| 5000
app.listen(PORT, () => console.log(`listen to port ${PORT}`))