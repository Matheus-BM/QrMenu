import React from "react";
import SideBar from "../../components/LoggedAreas/SideBar/SideBar";
import UserData from "../../components/LoggedAreas/UserData/UserData.js";

function PersonalData() {
  return (
    <div>
      <UserData />
      <SideBar />
    </div>
  );
}

export default PersonalData;
