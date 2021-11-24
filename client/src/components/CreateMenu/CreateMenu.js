import React from "react";
import "./CreateMenu.css";

function CreateMenu() {
  return (
    <div id="main">
      <div id="logo"></div>
      <h1 id="main-titulo">Crie seu Menu</h1>
      <fieldset id="teste">
        <div id="ladoA">
          <div id="create-category" className="emoji-main">
            <h3 className="emoji-title">Adicione Categorias</h3>
          </div>
          <div id="edit-category" className="emoji-main">
            <h3 className="emoji-title">Editar Categorias</h3>
          </div>
          <div id="remove-category" className="emoji-main">
            <h3 className="emoji-title">Remova Categorias</h3>
          </div>
        </div>
        <div id="ladoB">
          <div id="add-itens" className="emoji-main">
            <h3 className="emoji-title">Adicione itens</h3>
          </div>
          <div id="edit-itens" className="emoji-main">
            <h3 className="emoji-title">Editar um item</h3>
          </div>
          <div id="remove-itens" className="emoji-main">
            <h3 className="emoji-title">Remova itens</h3>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default CreateMenu;
