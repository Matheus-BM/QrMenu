import React, { useEffect, useState } from "react";
import "./ModalAddItem.css";
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
          <h1 id="title-category">Item</h1>

          <div id="form-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="name-desc">
                <input
                  id="name-item"
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  required
                />
                <input
                  id="input-item-desc"
                  placeholder="Descrição"
                  type="text"
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  required
                />
              </div>
              <div id="price-category">
                <input
                  id="price-item"
                  placeholder="Preço"
                  type="number"
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  required
                />
                <select
                  id="select-item"
                  defaultValue="0"
                  disabledonChange={(e) => setPriority(e.target.value)}
                >
                  <option disabled value="0">
                    Categoria:
                  </option>
                  <option value="0">Em Breve</option>
                </select>
              </div>
              <button
                id="btn-form-item"
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
