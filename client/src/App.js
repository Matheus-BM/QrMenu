import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage.js";
import AuthPage from "./pages/AuthPage/AuthPage.js";
import MenuCreate from "./pages/MenuCreate/MenuCreate.js";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import QrCode from "./pages/QrCode/QrCode";
import PersonalData from "./pages/PersonalData/PersonalData";
import PedidosProvider from "./ListMenuItems";
import Modal from "./components/Modal/Modal";
import Modal2 from "./components/Modal2/Modal2.js";
import Modal3 from "./components/Modal3/Modal3.js";
import { CategoriaMenu, ModalPedido, Title } from "./components/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/modaltemp" element={<Modal />} />
        <Route exact path="/modaltemp2" element={<Modal2 />} />
        <Route exact path="/modaltemp3" element={<Modal3 />} />
        <Route exact path="/" element={<WelcomePage />} />
        <Route
          exact
          path="/auth"
          element={
            <PublicRoute>
              {" "}
              <AuthPage />{" "}
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/Dashboard"
          element={
            <PrivateRoute>
              {" "}
              <MenuCreate />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/QrCode"
          element={
            <PrivateRoute>
              {" "}
              <QrCode />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/DadosPessoais"
          element={
            <PrivateRoute>
              <PersonalData />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/:nomeRestaurante"
          element={
            <div className="fundo">
              <PedidosProvider>
                <div className="container">
                  <Title value="MENU" />
                  <CategoriaMenu />
                  <ModalPedido />
                </div>
              </PedidosProvider>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
