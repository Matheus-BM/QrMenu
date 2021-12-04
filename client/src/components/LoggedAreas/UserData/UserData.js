import React from "react";
import { getUser ,removeUserSession } from "../../../utils/Common";
import "./Personal.css";
import axios from "axios";
import { baseURL } from "../../../apis/MenuFetcher";
import { useNavigate } from "react-router-dom";
function UserData() {

  const user = getUser();
  const navigate = useNavigate()

  function deleteUser(){
    console.log(user)
    axios.post(`${baseURL}deleteUser`,{
        email_gerente: user.email
    }).then( removeUserSession()).then(navigate("/Dashboard"));
  }

  return (
    <div id="main">
      <div id="logo"></div>
      <h1 id="titulo">Dados Pessoais</h1>
      <fieldset id="fieldset">
        <div id="all-info">
          <div className="info">
            <h2>Nome:  { ` ${user.name} ${user.sobrenome }`}</h2>
          </div>
          <div id="email" className="info">
            <h2>Email:  { `  ${user.email}`}</h2>
          </div>
          <div className="info">
            <h2>Nome do Restaurante: {` ${user.nomeRestaurante}`}</h2>
          </div>
        </div>
        <div onClick={()=> deleteUser()} className='btn-group'>
            <div id='remove' className='emoji' > </div>
            <div className='delete-btn' > Delete user</div>

        </div>
      </fieldset>
    </div>
  );
}

export default UserData;
