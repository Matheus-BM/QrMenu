import React, { useState } from "react";
import "./CreateMenu.css";
import ModalAddCategoria from "../ModalAddCategoria/ModalAddCategoria";
import ModalEditCategora from "../ModalEditCategora/ModalEditCategora";
import ModalRemoveCategora from "../ModalRemoveCategoria/ModalRemoveCategora";
import ModalAddItem from "../ModalAddItem/ModalAddItem";
import ModalEditItem from "../ModalEditItem/ModalEditItem";
import ModalRemoveItem from "../ModalRemoveItem/ModalRemoveItem";

function CreateMenu() {
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditCategoria, setToggleEditCategoria] = useState(false);
  const [toggleDeleteCategoria, setToggleDeleteCategoria] = useState(false);

  const [toggleModalAddItem, setToggleModalAddItem] = useState(false);
  const [toggleEditItem, setToggleEditItem] = useState(false);
  const [toggleDeleteItem, setToggleDeleteItem] = useState(false);


 

  return (
    <div id="main">
      <div id="logo"></div>
      <h1 id="main-titulo">Crie seu Menu</h1>

      <fieldset id="teste">
        <div id="ladoA">
          <div
            id="create-category"
            className="emoji-main"
            onClick={() => setToggleModal(true)}
          >
            <h3 className="emoji-title">Adicione Categorias</h3>
          </div>
          <div
            id="edit-category"
            className="emoji-main"
            onClick={() => setToggleEditCategoria(true)}
          >
            <h3 className="emoji-title">Editar Categorias</h3>
          </div>
          <div
            id="remove-category"
            className="emoji-main"
            onClick={() => setToggleDeleteCategoria(true)}
          >
            <h3 className="emoji-title">Remova Categorias</h3>
          </div>
        </div>
        <div id="ladoB">
          <div
            id="add-itens"
            className="emoji-main"
            onClick={() => setToggleModalAddItem(true)}
          >
            <h3 className="emoji-title">Adicione itens</h3>
          </div>
          <div
            id="edit-itens"
            className="emoji-main"
            onClick={() => setToggleEditItem(true)}
          >
            <h3 className="emoji-title">Editar um item</h3>
          </div>
          <div
            id="remove-itens"
            className="emoji-main"
            onClick={() => setToggleDeleteItem(true)}
          >
            <h3 className="emoji-title">Remova itens</h3>
          </div>
        </div>
      </fieldset>
      {toggleModal ? (
        <ModalAddCategoria onClose={() => setToggleModal(false)} />
      ) : null}
      {toggleEditCategoria ? (
        <ModalEditCategora onClose={() => setToggleEditCategoria(false)} />
      ) : null}
      {toggleDeleteCategoria ? (
        <ModalRemoveCategora onClose={() => setToggleDeleteCategoria(false)} />
      ) : null}

      {toggleModalAddItem ? (
        <ModalAddItem onClose={() => setToggleModalAddItem(false)} />
      ) : null}
      {toggleEditItem ? (
        <ModalEditItem onClose={() => setToggleEditItem(false)} />
      ) : null}
      {toggleDeleteItem ? (
        <ModalRemoveItem onClose={() => setToggleDeleteItem(false)} />
      ) : null}

      
    </div>
  );
}

export default CreateMenu;
