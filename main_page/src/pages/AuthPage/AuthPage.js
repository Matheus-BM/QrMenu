import React from "react";
import "./AuthPage.css";

function Auth_page() {
  return (
    <div className="bg">
      <div id="logo">
        <div id="logotipo"></div>
      </div>
      <div className="form-box">
        <div className="login-form">
          <h1>Login</h1>
          <form>
            <div className="col">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="col">
              <label>Senha</label>
              <input type="password" />
            </div>
            <button className="btn">Login </button>
          </form>
        </div>
        <div className="cadastro-form">
          <h1>REGISTRE-SE</h1>
          <form>
            <div className="col">
              <label>Nome</label>
              <input type="text" />
              <div className="col">
                <label>Sobrenome</label>
                <input type="text" />
              </div>
            </div>

            <div className="col">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="col">
              <label>Senha</label>
              <input type="password" />
            </div>
            <button className="btn">Registre-se</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth_page;
