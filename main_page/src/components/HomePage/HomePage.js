import React from 'react'
import "./HomePage.css"

function HomePage() {
    return (
        <div className="home">
            <div className="logo h1"></div>
            <div id="slogan" >Facilite o acesso ao menu do seu restaurante </div>
            <div className = "buttons" ><button className="btn Cadastro">Crie seu Menu</button><button className="btn Login">Login</button> </div>
            <div className="background_img"></div>
        </div>
    )
}

export default HomePage
