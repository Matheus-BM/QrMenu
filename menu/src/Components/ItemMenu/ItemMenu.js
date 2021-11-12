import React, { useContext } from "react";
import "./ItemMenu.css";
import { ContextlistaDePedidos } from "../../ListMenuItems";

function ItemMenu({ nome_produto, preco_produto,cod_produto,  descricao_produto }) {
  const { addPedido , menu } = useContext(ContextlistaDePedidos);
  function addPedidos(cod_produto) {
   addPedido(menu.find((pedido) => pedido.cod_produto === cod_produto));
  }

  return (
    <div className="item">
      <div className="item-header">
        <h3>{nome_produto}</h3>
        <p>{preco_produto}</p>
        <button className="btn add" onClick={() => addPedidos(cod_produto)}>
          +
        </button>
      </div>
      <p id="item-desc">{descricao_produto}</p>
    </div>
  );
}

export default ItemMenu;
