import React from "react";
import "./Modal3.css";

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
          <h1 id="title-category">Categoria</h1>

          <div id="form-modal">
            <form>
              <input placeholder="Nome" type="text" required />
              <select required>
                <option selected disabled value="">
                  Prioridade
                </option>
                <option>dormir</option>
                <option>acordar</option>
              </select>

              <button id="btn-form"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
