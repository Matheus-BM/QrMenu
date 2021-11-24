import React from "react";
import "./MenuCreate.css";
import SideBar from "../../components/SideBar/SideBar.js";
import CreateMenu from "../../components/CreateMenu/CreateMenu.js";

function MenuCreate() {
  return (
    <div>
      <CreateMenu />
      <SideBar />
    </div>
  );
}

export default MenuCreate;