import React from "react";
import "./SecondPage.css";

function HomePageSecondArea() {
  return (
    <div>
      <div id="bg2">
        
        <h1>Como Funciona?</h1>
        <div className="row center">
          <div className="step_group">  
            <h3 id="step1">Cadastre-se</h3>
            <div id="img1"></div>
          </div>
          <div className="step_group">
            <h3 id="step2">Crie seu cardapio</h3>
            <div id="img2"></div>
          </div>
          <div className="step_group">
              <h3 id="step3">Começe a usar</h3>
              <div id="img3"></div>
          </div>
        </div>
          
          
          
        <h1 id="title2">SIMPLES ASSIM!</h1>
      </div>
    </div>
  );
}

export default HomePageSecondArea;
