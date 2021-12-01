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


    const nomeRestauranteJaCadastrado = await client.query("SELECT nome_restaurante from restaurante where nome_restaurante = $1",[nomeRestaurante]);


    if( nomeRestauranteJaCadastrado.rows[0] === undefined ){
        console.log(nomeRestauranteJaCadastrado.rows)

    if( uniqueEmail === undefined  ){
        await client.query("INSERT INTO gerente (nome_gerente, sobrenome_gerente,email_gerente , senha_gerente) values ($1,$2,$3,$4) ",[nome,sobrenome,email,password])
        
        var cod_gerente = await client.query("SELECT cod_gerente FROM gerente where email_gerente = $1",[email])
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
    }else{
        return res.status(401).json({
            error:true,
            message: "Nome do restaurante indisponivel."
        })
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

        console.log(nomeCategoria)
        if(nomeCategoria === ""){
            return res.status(400).json({
                error:true,
                msg:"Escolha um nome"
            })
        }

        if(nomeCategoria.length>50){
            return res.status(400).json({
                error:true,
                msg:"Nome só pode ter até 50 Caracteres"
            })
        }

        const categoria = await client.query("SELECT nome_categoria from categoria INNER JOIN restaurante as r ON r.cod_restaurante = $2 WHERE nome_categoria= $1 and categoria.cod_cardapio= r.cod_cardapio",[nomeCategoria,idRestaurante])
        
        if(categoria.rows[0]){
           return res.status(400).json({
                error:true,
                msg:"Categoria já castrada"
            })
        }
        await client.query("INSERT INTO categoria (nome_categoria,prioridade_categoria,cod_cardapio) values ($1,$2,(SELECT cod_cardapio from restaurante where cod_restaurante = $3)) ",[nomeCategoria,priority,idRestaurante]);

        return res.status(200).json({
            error:false,
            msg:"Categoria cadastrada com sucesso"
        })
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
        const nomeRestaurante = req.body.nomeRestaurante;

        if(!nomeCategoria||!nomeItem||!descItem||!precoItem){
            return res.status(400).json({
                error:true,
                msg:"Preencha todos os campos"
            })
        }

        if(descItem.length>100){
            return res.status(400).json({
                error:true,
                msg:"Descrição só pode ter até 100 Caracteres"
            })
        }

        if(nomeItem.length>50){
            return res.status(400).json({
                error:true,
                msg:"Nome só pode ter até 50 Caracteres"
            })
        }
        if(precoItem >= 1000){
            return res.status(400).json({
                error:true,
                msg:"A versão beta do sistema só aceita preços de até 1000"
            })
        }


        
        
        const produto = await client.query("SELECT nome_produto FROM produto INNER JOIN categoria ON categoria.nome_categoria = $1 INNER JOIN restaurante as r ON nome_restaurante = $3 WHERE produto.cod_categoria = categoria.cod_categoria and  nome_produto = $2 and nome_restaurante = r.nome_restaurante ",[nomeCategoria,nomeItem,nomeRestaurante])

        if(produto.rows[0]){
           return res.status(400).json({
                error:true,
                msg:"Item já castrado"
            })
        }
        await client.query("INSERT INTO produto (nome_produto,descricao_produto,preco_produto,cod_categoria) values ($1,$2,$3,(SELECT cod_categoria from categoria INNER JOIN restaurante AS res ON res.nome_restaurante= $5 where nome_categoria = $4 and categoria.cod_cardapio = res.cod_cardapio )) ",[nomeItem,descItem,precoItem,nomeCategoria,nomeRestaurante]);

        return res.status(200).json({
            error:false,
            msg:"Item cadastrado com sucesso"
        })
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


    
    if(!cod_categoria||!nomeItem||!descItem||!precoItem){
        return res.status(400).json({
            error:true,
            msg:"Preencha todos os campos"
        })
    }

    if(descItem.length>100){
        return res.status(400).json({
            error:true,
            msg:"Descrição só pode ter até 100 Caracteres"
        })
    }

    if(nomeItem.length>50){
        return res.status(400).json({
            error:true,
            msg:"Nome só pode ter até 50 Caracteres"
        })
    }
    if(precoItem >= 1000){
        return res.status(400).json({
            error:true,
            msg:"A versão beta do sistema só aceita preços de até 1000"
        })
    }
        
    const produto = await client.query("SELECT * from produto where nome_produto = $1 and cod_categoria = $2 ",[nomeItem,cod_categoria])

    if(produto.rows[0]){
       return res.status(400).json({
            error:true,
            msg:"Item já castrado"
        })
    }

    await client.query("UPDATE produto SET nome_produto = $1 ,descricao_produto = $2,preco_produto = $3,cod_categoria = $4 where cod_produto = $5",
    [nomeItem,descItem,precoItem,cod_categoria,cod_produto])

    return res.status(200).json({
        error:false,
        msg:"Item editado com sucesso"
    })
}catch (e){
    console.log(e)
}
})

//Edit categoria
app.post('/api/editCategoria',async(req,res)=>{

    const cod_categoria =req.body.cod_categoria;
    const nome_categoria = req.body.nomeCategoria;
    const id_restaurante = req.body.idRestaurante
    try{

        if(nome_categoria.length>50){
            return res.status(400).json({
                error:true,
                msg:"Nome só pode ter até 50 Caracteres"
            })
        }


    const categoria = await client.query("SELECT nome_categoria from categoria INNER JOIN restaurante ON restaurante.cod_restaurante = $2 where nome_categoria = $1 and categoria.cod_cardapio = restaurante.cod_cardapio",[nome_categoria,id_restaurante])
    
    if(categoria.rows[0]){
       return res.status(400).json({
            error:true,
            msg:"Categoria já castrada"
        })
    }



    await client.query("UPDATE categoria SET nome_categoria = $1 where cod_categoria= $2"
   , [ nome_categoria, cod_categoria])

   return res.status(200).json({
    error:false,
    msg:"Categoria editada com sucesso"
})
}catch (e){
    console.log(e)
}
})  




//get Itens from a menu

app.get("/api/:nomeRestaurante", async (req,res) =>{
    try {

        const {nomeRestaurante} =req.params

        var produtos = await client.query
        ('SELECT cod_produto,nome_produto,descricao_produto,preco_produto,produto.cod_categoria FROM categoria INNER JOIN restaurante ON restaurante.nome_restaurante = $1 INNER JOIN produto ON produto.cod_categoria = categoria.cod_Categoria  WHERE categoria.cod_cardapio = restaurante.cod_cardapio',[nomeRestaurante]);


        res.json(produtos.rows)
        
        
    } 
    catch (error) {console.log(error)}

})

//get a categoria 

app.get("/api/:nomeRestaurante/categoria", async (req,res) =>{
    
    try {

        const {nomeRestaurante} =req.params

    
       const restaurante = await client.query("SELECT cod_categoria,nome_categoria,prioridade_categoria FROM categoria INNER JOIN restaurante ON restaurante.nome_restaurante = $1 WHERE categoria.cod_cardapio = restaurante.cod_cardapio",[nomeRestaurante])
    
        res.json(restaurante.rows)
        
    } 
    catch (error) {console.log(error)}

})


// DELETE ACOUNT

app.post('/api/deleteUser',async (req,res)=>{
    const email_gerente = req.body.email_gerente;
    try{
        console.log(email_gerente)
        client.query('DELETE from gerente where email_gerente = $1 ',[email_gerente])
    }catch(e){console.log(e)}
});
/*
app.put('/api/updateGerente',async (req,res)=>{
    const email_gerente = req.body.email_gerente
    const nome_gerente = req.body.nome_gerente
    const sobrenome_gerente = req.body.sobrenome_gerente
    const senha_gerente = req.body.senha_gerente
    const nome_restaurante = req.body.nome_restaurante

    client.query('UPDATE gerente SET nome_gerente = $1,sobrenome_gerente =$2,email_gerente =$3,senha_gerente =$4 where email_gerente =$')

} )
*/

const PORT = process.env.PORT|| 5000
app.listen(PORT, () => console.log(`listen to port ${PORT}`))