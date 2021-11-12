import React from "react";
import "./ModalPedido.css";
import { useContext } from "react";
import { ContextlistaDePedidos } from "../../ListMenuItems";

const ModalPedido = () => {
  const { pedidos, deletePedido } = useContext(ContextlistaDePedidos);

  const MenuActive = () => {
    let arrowRot = document.getElementById("active");
    arrowRot.classList.toggle("arrow-active");
    let pedidosList = document.getElementById("pedidos-list");
    pedidosList.classList.toggle("modal-active");
  };

  return (
    <div id="pedidos-list" className="Modal">
      <div className="box-modal">
        <i id="active" className="fas fa-chevron-down" onClick={MenuActive}></i>
        <h2>Pedidos</h2>
      </div>
      <ul>
        {pedidos.map((item, i) => (
          <li key={i++}>
            
            {item.nome_produto } <p>{item.qt_produto}</p>
            <button className="btn remove" onClick={() => deletePedido(item)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalPedido;
