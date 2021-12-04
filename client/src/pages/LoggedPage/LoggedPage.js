import React from "react";
import SideBar from "../../components/LoggedAreas/SideBar/SideBar";
import PainelDeControle from "../../components/LoggedAreas/PainelDeControle/PainelDeControle";

function LoggedPage() {
  return (
    <div className="row">
       <SideBar />
      <PainelDeControle />
    </div>
  );
}

export default LoggedPage;
