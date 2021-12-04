import React from "react";
import SideBar from "../../components/LoggedAreas/SideBar/SideBar";
import QrCodeMenu from "../../components/LoggedAreas/QrCodeGenerator/QrCodeMenu";

function QrCode() {
  return (
    <div>
      <SideBar />
      <QrCodeMenu />
    </div>
  );
}

export default QrCode;
