import React from 'react'
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import "./App.css"
import  PedidosProvider  from './ListMenuItems';
import {CategoriaMenu, ModalPedido, Title} from './Components/index'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/:nomeRestaurante" element={
            <PedidosProvider>
            <Title value = "MENU"/>
            <CategoriaMenu/>
            <ModalPedido/>
            </PedidosProvider>} /> 
      </Routes>
    </Router>

   
  )
}

export default App

/*


*/ 