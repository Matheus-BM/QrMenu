import React from 'react'
import "./App.css"
import  PedidosProvider  from './ListMenuItems';
import {CategoriaMenu, ModalPedido, Title} from './Components/index'

function App() {

  return (
    <PedidosProvider>
      <Title value = "MENU"/>
      <CategoriaMenu/>
      <ModalPedido/>
    </PedidosProvider>
  )
}

export default App
