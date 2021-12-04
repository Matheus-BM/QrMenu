import React from "react";
import "./HomePageThirdArea.css";
import {Link} from "react-router-dom"

function HomePageThirdArea() {
  return (
    <div>
      <div id="bg3">
        <h1 id="navtitle">Custos?</h1>
        <div id="maintitle">
          <h1>100% Free</h1>
          <h1>QrMenu é gratuito</h1>
        </div>
        <div id="buttons">
          <Link to="/auth"> <button id="btn1">Comece Agora</button> </Link>
          <Link to="/auth">  <button id="btn2">Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default HomePageThirdArea;
