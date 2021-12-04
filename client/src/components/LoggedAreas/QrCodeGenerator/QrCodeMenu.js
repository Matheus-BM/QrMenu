import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../utils/Common.js";
import "./QrCodeMenu.css";

function QrCodeMenu() {

  const user = getUser();

  function printImg() {
    var win = window.open('');
    win.document.write(`<img src= https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://QrMenus.pt/${user.nomeRestaurante} onload="window.print();window.close()" />`);
    win.focus();
  }

  return (
    <div>
      <div id="logo"></div>
      <div id="all">
        <h1 id="title-qrcode">Seu QrCode</h1>
        <Link to = {`/${user.nomeRestaurante}`}>
          <h3 id="subtitle">Seu link : https://QrMenus.site/{user.nomeRestaurante} </h3>
        </Link>
        <img src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://QrMenus.pt/${user.nomeRestaurante}`} alt="qrcode carregando.."/>
        <button id="button-gerarqr" onClick={()=> printImg()}>Imprima seu QrCode</button>
      </div>

    </div>
  );
}

export default QrCodeMenu;
