import React, { useContext } from "react";
import { listMenuItems } from "../../ListMenuItems";
import "./ItemMenu.css";
import { ContextlistaDePedidos } from "../../ListMenuItems";

function ItemMenu({ nome, preco, id, descricao }) {
  const { addPedido } = useContext(ContextlistaDePedidos);

  function addPedidos(id) {
    addPedido(listMenuItems.find((item) => item.id === id));
  }

  return (
    <div className="item">
      <div className="item-header">
        <h3>{nome}</h3>
        <p>{preco}</p>
        <button className="btn add" onClick={() => addPedidos(id)}>
          +
        </button>
      </div>
      <p id="item-desc">{descricao}</p>
    </div>
  );
}

export default ItemMenu;
