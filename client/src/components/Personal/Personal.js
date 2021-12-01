import React from "react";
import { getUser } from "../../utils/Common";
import "./Personal.css";

function Personal() {

  const user = getUser();

  function deleteUser(){
    axios.delete(`${baseURL}deleteUser`,{
        email_gerente: user.email_gerente
    })
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
        <button onClick={()=> deleteUser()}  id='remove'> Delete User </button>
      </fieldset>
    </div>
  );
}

export default Personal;
