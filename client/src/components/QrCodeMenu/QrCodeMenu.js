import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar.js";
import { getUser } from "../../utils/Common.js";
import "./QrCodeMenu.css";

function QrCodeMenu() {

  const user = getUser();

  return (
    <div>
      <div id="logo"></div>
      <div id="all">
        <h1 id="title-qrcode">Seu QrCode</h1>
        <Link to = {`/${user.nomeRestaurante}`}>
          <h3 id="subtitle">Seu link : https://QrMenu.xyz/{user.nomeRestaurante} </h3>
        </Link>
        <img src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://QrMenu.xyz/${user.nomeRestaurante}`} alt="qrcode carregando.."/>
        <button id="button-gerarqr">Baixe seu QrCode</button>
      </div>
      <Sidebar />
    </div>
  );
}

export default QrCodeMenu;
