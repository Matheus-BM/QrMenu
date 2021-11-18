require('dotenv').config()
const express = require("express")
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');

//DB Connection

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



//// LOGIN AREA //////

//REGISTER #TODO INSTALL bycript
app.post("/api/register", async (req,res)=>{

    const users = await client.query("SELECT * from gerente")
    const usersArray = users.rows;
    
    
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,1);

    const uniqueEmail = usersArray.find((user) => user.email_gerente === email );



    if( uniqueEmail === null){
        await client.query("INSERT INTO gerente (nome_gerente, sobrenome_gerente,email_gerente , senha_gerente) values ($1,$2,$3,$4) ",[nome,sobrenome,email,password])
        return res.status(200).send("Registrado com sucesso");
    }

    return res.status(401).send("Usuario já cadastrado");
    
})

//LOGIN
app.post("/api/login", async (req,res) =>{

    const users = await client.query("SELECT * from gerente")
    const usersArray = users.rows;

    const email = req.body.email;
    const password = req.body.password;

    const user = usersArray.find((user) => user.email_gerente === email  );

    if( user === undefined){
        return res.status(404).send("email not found");
    }

    try {
       if( await bcrypt.compare(password, user.senha_gerente)){
            res.status(200).send(true)
        }else{
            res.send(false);
        }
    } catch (error) {
        res.status(500).send()
    }

    
})

const PORT = process.env.PORT| 5000
app.listen(PORT, () => console.log(`listen to port ${PORT}`))