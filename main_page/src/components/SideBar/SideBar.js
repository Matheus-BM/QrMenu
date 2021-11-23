import React from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import { getUser, removeUserSession } from "../../utils/Common";
import "./SideBar.css";





function Sidebar() {

  const user = getUser();

  const navigate = useNavigate();

  const handleLogout = ()=>{
    removeUserSession();
    navigate('/auth');
  }
  return (
    <div id="bg-left">
      <div id="seta"></div>
    <Link to="/Dashboard">
      <div id="painel-controle" className="emoji-bgleft">
        <h3 className="emoji-name">Painel de Controle</h3>
      </div>
     </Link> 
     <Link to={`/${user.nomeRestaurante}`}>
      <div id="cardapio" className="emoji-bgleft">
        <h3 className="emoji-name">Ver Cardápio</h3>
      </div>
      </Link>
        <Link to="/Dashboard/QrCode">
      <div id="gerar-qrcode" className="emoji-bgleft">
        <h3 className="emoji-name">Gerar QrCode</h3>
      </div>
      </Link  >
      <div id="final">
      <Link to="/Dashboard/DadosPessoais">
        <div id="meus-dados" className="emoji-final">
          <h3 id="dados-frase">Dados de {user.name}</h3>
        </div>
        </Link>
        <button id="logout-button" onClick={()=> handleLogout()}>
          <div id="logout" className="emoji-final"></div>
          <h3 id="button-frase" >Logout</h3>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
