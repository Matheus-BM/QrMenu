import React from "react";
import "./Modal2.css";

function Modal() {
  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "transparent";
  };

  return (
    <div>
      <div id="fundin">
        <button id="btnzin" onClick={ModalActive}>
          Click Aqui
        </button>
        <div className="modal">
          <div id="x" onClick={ModalDesactive}></div>
          <h1 id="title-category">Remova Categoria</h1>
          <fieldset id="field">
            <div id="category">
              <h2 className="h2">Categoria 1</h2>
              <h2 className="h2">Categoria 2</h2>
              <h2 className="h2">Categoria 3</h2>
              <h2 className="h2">Categoria 4</h2>
              <h2 className="h2">Categoria 5</h2>
            </div>
            <div id="emojis">
              <div className="emoji-side-trash"></div>
              <div className="emoji-side-trash"></div>
              <div className="emoji-side-trash"></div>
              <div className="emoji-side-trash"></div>
              <div className="emoji-side-trash"></div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Modal;
