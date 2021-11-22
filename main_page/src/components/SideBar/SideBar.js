import React from "react";
import { useNavigate } from "react-router";
import "./SideBar.css";





function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    navigate('/auth');
  }
  return (
    <div id="bg-left">
      <div id="seta"></div>
      <div id="painel-controle" className="emoji-bgleft">
        <h3 className="emoji-name">Painel de Controle</h3>
      </div>
      <div id="cardapio" className="emoji-bgleft">
        <h3 className="emoji-name">Ver Cardápio</h3>
      </div>
      <div id="gerar-qrcode" className="emoji-bgleft">
        <h3 className="emoji-name">Gerar QrCode</h3>
      </div>
      <div id="final">
        <div id="meus-dados" className="emoji-final">
          <h3 id="dados-frase">Meus Dados</h3>
        </div>
        <button id="logout-button" onClick={()=> handleLogout()}>
          <div id="logout" className="emoji-final"></div>
          <h3 id="button-frase" >Logout</h3>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
