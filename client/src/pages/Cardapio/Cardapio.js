import React from 'react'
import PedidosProvider from "../../CardapioContext";
import { CategoriaMenu, ModalPedido, Title } from "../../components/Cardapio/index";

function Cardapio() {
    return (
        <div className="fundo">
        <PedidosProvider>
          <div className="container">
            <Title value="MENU" />
            <CategoriaMenu />
            <ModalPedido />
          </div>
        </PedidosProvider>
      </div>
    )
}

export default Cardapio
