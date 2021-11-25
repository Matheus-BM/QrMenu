import React,{useState} from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";
import { setUserSession } from "../../utils/Common";
import { baseURL } from "../../apis/MenuFetcher";
import Navbar from "../../components/navbar/Navbar"
function Auth_page() {

  /*LOGIN*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  const handleLogin = (e)=>{
    
    setError(null);
    setLoading(true);

    axios.post(`${baseURL}login`, {
      email: username,
      password: password
    }).then(response =>{
      setLoading(false);
      setUserSession(response.data.token,response.data.user);
      navigate('/Dashboard');
    }).catch(error =>{
      setLoading(false);
      if(error.response.status === 401 || error.response.status === 400){
        setError(error.response.data.message);
      }else{
        setError("ERRO: tente novamente mais tarde");
      }
      console.error("error", error)
    })
  }

  /*REGISTRO*/
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nomeRestaurante, setNomeRestaurante] = useState("")
  const [email , setEmail] = useState("");
  const [senha, setSenha] = useState(""); 

  const handleRegister = (e)=>{
    
    setError(null);
    setLoading(true);

    axios.post(`${baseURL}register`, {
      email: email,
      password: senha,
      nome: nome,
      sobrenome: sobrenome,
      nomeRestaurante: nomeRestaurante.trim().toLowerCase()

    }).then(response =>{
      setLoading(false);
      setUserSession(response.data.token,response.data.user);
      navigate('/Dashboard');
    }).catch(error =>{
      setLoading(false);
      if(error.response.status === 401 || error.response.status === 400){
        setError(error.response.data.message);
      }else{
        setError("ERRO: tente novamente mais tarde");
      }
      console.error("error", error)
    })
  }


  return (
    <div className="bg">
      <Link to="/"> <div id="voltar"> ← voltar</div></Link>
      <div id="logo">
        <div id="logotipo"></div>
      </div>
      
      <div className="form-box">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={e => ( e.preventDefault())}>
            <div className="col">
              <label>Email</label>
              <input type="email" value={username} onChange={e=> setUsername(e.target.value)}/>
            </div>
            <div className="col">
              <label>Senha</label>
              <input type="password" value={password} onChange={e =>setPassword(e.target.value)} />
            </div>
            {error&&<div className="erro"> {error} </div>}
            <button className="btn" onClick={() => handleLogin()} disabled={loading}>{ loading?"Loading" : "Login"} </button>
          </form>
        </div>
        <div className="cadastro-form">
          <h1>REGISTRE-SE</h1>
          <form onSubmit={e => ( e.preventDefault())}>
           
              <div className="row"> 
                <div className="col">
                  <label>Nome</label>
                  <input type="text" value={nome} onChange={ e => setNome(e.target.value)} />
                </div>
                <div className="col" >

                  <label>Sobrenome</label>
                  <input type="text" value={sobrenome} onChange={ e => setSobrenome(e.target.value)} />

                </div>
  
          
              </div>
              
       
            <div className="col">
              <label>Nome do Restaurante</label>
              <input type="text" value={nomeRestaurante} onChange={ e => setNomeRestaurante(e.target.value)} />
            </div>

            <div className="col">
              <label>Email</label>
              <input type="email" value={email} onChange={ e => setEmail(e.target.value)} />
            </div>
            <div className="col">
              <label>Senha</label>
              <input type="password"  value={senha} onChange={ e => setSenha(e.target.value)} />
            </div>
            <button className="btn" onClick={() => handleRegister()} disabled={loading}>{ loading?"Loading" : "Registre-se"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth_page;
