require('dotenv').config()
const express = require("express")
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const utils = require('./utils');

//DB Connection

const {Pool} = require('pg')
const client = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST||"localhost",
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
})


//middleware
app.use(cors());
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
    var token = req.headers['authorization'];
  if (!token) return next(); 
 
  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; 
      next();
    }
  });

})

//Routes//

/

//// LOGIN AREA //////

//REGISTER 
app.post("/api/register", async (req,res)=>{
    try{

    const users = await client.query("SELECT * from gerente")
    const usersArray = users.rows;
    
    
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const nomeRestaurante = req.body.nomeRestaurante;
    var password = req.body.password;

    if (!email || !password ||!nomeRestaurante|| !nome || !sobrenome) {
        return res.status(400).json({
            error:true,
            message: "Todos os campos são necessarios!"
        })
    }

    password = await bcrypt.hash(req.body.password,1);

    

    const uniqueEmail = usersArray.find((user) => user.email_gerente === email );


    


    if( uniqueEmail === undefined){
        await client.query("INSERT INTO gerente (nome_gerente, sobrenome_gerente,email_gerente , senha_gerente) values ($1,$2,$3,$4) ",[nome,sobrenome,email,password])
        
        var cod_gerente = await client.query("SELECT cod_gerente FROM gerente where nome_gerente = $1",[nome])
        cod_gerente = cod_gerente.rows[0].cod_gerente;

        var cod_cardapio = await client.query("SELECT MAX(cod_cardapio) FROM cardapio");
        cod_cardapio = cod_cardapio.rows[0].max +1;

        await client.query(" INSERT INTO cardapio (cod_cardapio) values ($1)",[cod_cardapio])

        await client.query("INSERT INTO restaurante (nome_restaurante, cod_gerente,cod_cardapio)  values ($1,$2,$3)", [nomeRestaurante,cod_gerente,cod_cardapio])
        

        var user = await client.query("Select * from gerente where cod_gerente = $1",[cod_gerente])
        user = user.rows[0]

        const restaurante = await client.query("SELECT cod_restaurante,nome_restaurante from restaurante where cod_gerente = $1",[cod_gerente])
        
        if(restaurante.rows[0] === undefined) {
            return res.status(400).json({
                error:true,
                message: "Email não cadastrado"
            })
        }else{
            user = {
                ...user,
                idRestaurante: restaurante.rows[0].cod_restaurante,
                nomeRestaurante: restaurante.rows[0].nome_restaurante 
    
            }
        }
        const token = utils.generateToken(user);

        const userObj = utils.getCleanUser(user);
        return res.status(200).json({user: userObj, token});
        
    }

    return res.status(401).json({
        error:true,
        message: "Usuario já cadastrado!"
    })


    }catch (e){
        console.error(e);
    }
})

//LOGIN
app.post("/api/login", async (req,res) =>{
    
    try {
        
        const email = req.body.email;
        const password = req.body.password;
        
        if (!email || !password) {
            return res.status(400).json({
                error:true,
                message: "Email ou senha são necessarios!"
            })
        }

        const users = await client.query("SELECT * from gerente")
        const usersArray = users.rows;
        
        let user = usersArray.find((user) => user.email_gerente === email  );
        
        if( user === undefined){
            return res.status(400).json({
                error:true,
                message: "Email não encontrado!"
            })
        }
        
        const restaurante = await client.query("SELECT cod_restaurante,nome_restaurante from restaurante where cod_gerente = $1",[user.cod_gerente])
        
        if(restaurante.rows[0] === undefined) {
            return res.status(400).json({
                error:true,
                message: "Email não cadastrado"
            })
        }else{
            user = {
                ...user,
                idRestaurante: restaurante.rows[0].cod_restaurante,
                nomeRestaurante: restaurante.rows[0].nome_restaurante 
    
            }
        }

       

        const match = await bcrypt.compare(password, user.senha_gerente);

        if(match){

            const token = utils.generateToken(user);

            const userObj = utils.getCleanUser(user);
            return res.status(200).json({user: userObj, token});

        }else{
            return res.status(400).json({
                error:true,
                message: "Email ou senha invalidos!"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send()
    }

    
})


//Verificar Token

app.get("api/verifyToken", (req,res) => {
    var token = req.query.token;
    if(!token){
        return res.status(400).send("Token esta faltando")
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err,user) => {
        if(err) return res.status(401).send("Token invalido");

        const users = await client.query("SELECT * from gerente")
        const usersArray = users.rows;
        const uniqueEmail = usersArray.find((user) => user.email_gerente === email );
        
    
        if(user.email !== uniqueEmail.email_gerente){
            if(err) return res.status(401).send("Email invalido");
        }
    
        var userObj = utils.getCleanUser(userData);
        return res.json({user:userObj, token});
    })

  
})



//CREATE SECTION

app.post('/api/addCategoria', async (req,res)=>{
    try{
        const nomeCategoria =req.body.nomeCategoria;
        const priority =req.body.priority;
        const idRestaurante = req.body.idRestaurante

        const idCardapio = await client.query("SELECT cod_cardapio from restaurante where cod_restaurante =$1",[idRestaurante])

        const categoria = await client.query("SELECT nome_categoria from categoria where nome_categoria= $1",[nomeCategoria])
        
        if(categoria.rows[0]){
           return res.status(400).json({
                error:true,
                msg:"Categoria já castrada"
            })
        }
        await client.query("INSERT INTO categoria (nome_categoria,prioridade_categoria,cod_cardapio) values ($1,$2,$3) ",[nomeCategoria,priority,idCardapio.rows[0].cod_cardapio]);

        return 
    }catch(e){
        console.log(e)
    }
})



app.post('/api/addItem', async (req,res)=>{
    try{
        const nomeCategoria =req.body.nomeCategoria;
        const nomeItem = req.body.nomeItem;
        const descItem = req.body.descItem;
        const precoItem = req.body.precoItem;

        // console.log(`Categoria : ${nomeCategoria} \nNome Item: ${nomeItem}\nDesc ${descItem}\nPreço ${precoItem}`)

        const categoria = await client.query("SELECT cod_categoria from categoria where nome_categoria= $1",[nomeCategoria])
        
        const produto = await client.query("SELECT * from produto where nome_produto = $1",[nomeItem])

        if(produto.rows[0]){
           return res.status(400).json({
                error:true,
                msg:"Item já castrado"
            })
        }
        await client.query("INSERT INTO produto (nome_produto,descricao_produto,preco_produto,cod_categoria) values ($1,$2,$3,$4) ",[nomeItem,descItem,precoItem,categoria.rows[0].cod_categoria]);

        return 
    }catch(e){
        console.log(e)
    }
})

//DELETE CATEGORIA
app.post('/api/deleteCategoria',async(req,res)=>{
    const cod_categoria = req.body.cod_categoria;
    await client.query("DELETE FROM categoria where cod_categoria = $1",[cod_categoria])
})

//DELETE Item
app.post('/api/deleteItem',async(req,res)=>{
    const cod_produto = req.body.cod_produto;
    await client.query("DELETE FROM produto where cod_produto = $1",[cod_produto])
})

//Edit Item
app.post('/api/editItem',async(req,res)=>{
    const cod_produto = req.body.cod_produto;
    const cod_categoria =req.body.cod_categoria;
    const nomeItem = req.body.nomeItem;
    const descItem = req.body.descItem;
    const precoItem = req.body.precoItem;
try{

    await client.query("UPDATE produto SET nome_produto = $1 ,descricao_produto = $2,preco_produto = $3,cod_categoria = $4 where cod_produto = $5",
    [nomeItem,descItem,precoItem,cod_categoria,cod_produto])
}catch (e){
    console.log(e)
}
})

//Edit categoria
app.post('/api/editCategoria',async(req,res)=>{
    const cod_categoria =req.body.cod_categoria;
    const nome_categoria = req.body.nomeCategoria;


try{
    await client.query("UPDATE categoria SET nome_categoria = $1 where cod_categoria= $2"
   , [ nome_categoria, cod_categoria])
}catch (e){
    console.log(e)
}
})  




//get Itens from a menu

app.get("/api/:nomeRestaurante", async (req,res) =>{
    try {

        const {nomeRestaurante} =req.params

        var idCardapio = await client.query('SELECT cod_cardapio FROM restaurante where nome_restaurante = $1',[nomeRestaurante])

        idCardapio =idCardapio.rows[0].cod_cardapio
       
        var categorias = await client.query('SELECT * from categoria where cod_cardapio = $1',[idCardapio])


        var produtos = [];
        var produto = null;

        for (const categoria of  categorias.rows) {
             produto = await (await client.query("SELECT * FROM produto where cod_categoria = $1 ",[categoria.cod_categoria])).rows
             
             if( produto !== undefined){
              produtos.push(...produto)
             }
        };

        res.json(produtos)
        
    
        
        
        
    } 
    catch (error) {console.log(error)}

})

//get a categoria 

app.get("/api/:nomeRestaurante/categoria", async (req,res) =>{
    
    try {

        const {nomeRestaurante} =req.params

        var idCardapio = await client.query('SELECT cod_cardapio FROM restaurante where nome_restaurante = $1',[nomeRestaurante])


        const restaurante = await client.query("SELECT * from categoria where cod_cardapio = $1 ",[idCardapio.rows[0].cod_cardapio])
        res.json(restaurante.rows)
        
    } 
    catch (error) {console.log(error)}

})





const PORT = process.env.PORT|| 5000
app.listen(PORT, () => console.log(`listen to port ${PORT}`))