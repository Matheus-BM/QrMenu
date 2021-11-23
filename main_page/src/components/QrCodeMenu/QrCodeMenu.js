import React from "react";
import Sidebar from "../../components/SideBar/SideBar.js";
import "./QrCodeMenu.css";

function QrCodeMenu() {
  return (
    <div>
      <div id="logo"></div>
      <div id="all">
        <h1 id="title-qrcode">Seu QrCode</h1>
        <a href="#">
          <h3 id="subtitle">Seu link : https://QrMenu.xyz/NomeRestaurante </h3>
        </a>
        <div id="qrcode"></div>
        <button id="button-gerarqr">Baixe seu QrCode</button>
      </div>
      <Sidebar />
    </div>
  );
}

export default QrCodeMenu;
