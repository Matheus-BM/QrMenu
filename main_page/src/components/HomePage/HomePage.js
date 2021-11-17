import React from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="home">
            <div className="logo h1"></div>
            <div id="slogan" >Facilite o acesso ao menu do seu restaurante </div>
            <div className = "buttons" ><Link to="/auth" className="btn Cadastro">Crie seu Menu</Link><Link to="/auth" className="btn Login">Login</Link> </div>
            <div className="background_img"></div>
        </div>
    )
}

export default HomePage
