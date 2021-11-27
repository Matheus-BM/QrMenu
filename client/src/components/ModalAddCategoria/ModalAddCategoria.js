import React, { useEffect, useState } from "react";
import "./ModalAddCategoria.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";

function Modal({ onClose = () => {} }) {
  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };
  // eslint-disable-next-line
  useEffect(() => {
    ModalActive();
  }, []);

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };

  const [nomeCategoria, setNomeCategoria] = useState("");
  const [priority, setPriority] = useState("0");

  const handleSubmit = () => {
    axios
      .post(`${baseURL}addCategoria`, {
        nomeCategoria: nomeCategoria,
        priority: priority,
      })
      .then(ModalDesactive());
  };

  return (
    <div>
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={() => ModalDesactive()}></div>
          <h1 id="title-category">Categoria</h1>

          <div id="form-modal">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                id="name-category"
                placeholder="Nome"
                type="text"
                onChange={(e) => setNomeCategoria(e.target.value)}
                required
              />
              <select
                id="select-priority"
                defaultValue="0"
                disabled
                onChange={(e) => setPriority(e.target.value)}
              >
                <option disabled value="0">
                  Prioridade:
                </option>
                <option value="0">Em Breve</option>
              </select>

              <button
                id="btn-form"
                type="submit"
                onClick={() => handleSubmit()}
              ></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
