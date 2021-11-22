import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage.js";
import AuthPage from "./pages/AuthPage/AuthPage.js";
import MenuCreate from "./pages/MenuCreate/MenuCreate.js";
import PersonalData from "./pages/PersonalData/PersonalData";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/auth" element={<AuthPage/>} />
        <Route exact path="/AdminMenu" element={<MenuCreate />} />
        <Route exact path="/personalData" element={<PersonalData />} />
      </Routes>
    </Router>
  );
}

export default App;
