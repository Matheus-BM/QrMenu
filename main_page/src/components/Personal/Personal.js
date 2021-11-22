import React from "react";
import "./Personal.css";

function Personal() {
  return (
    <div id="main">
      <div id="logo"></div>
      <h1 id="titulo">Dados Pessoais</h1>
      <fieldset id="fieldset">
        <div id="all-info">
          <div className="info">
            <h2>Nome:</h2>
            <h2>Jõao</h2>
          </div>
          <div id="email" className="info">
            <h2>Email:</h2>
            <h2>jõaogamer@hotmail.com</h2>
          </div>
          <div className="info">
            <h2>Senha:</h2>
            <h2>********</h2>
          </div>
        </div>
        <div id="options">
          <div id="edit" className="emoji">
            <h3 className="name-emoji">Editar</h3>
          </div>
          <div id="remove" className="emoji">
            <h3 className="name-emoji">Apagar Conta</h3>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default Personal;
