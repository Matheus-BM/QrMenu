import React from 'react'
import "./Auth_page.css"

function Auth_page() {
    return (
        <div className ="bg">
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
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <div className="col">
                            <label>Senha</label>
                            <input type="password" />
                        </div>
                        <div className="col">
                            <label>Confirme Sua senha</label>
                            <input type="password" />
                        </div>
                        <button className="btn">Registre-se </button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth_page
