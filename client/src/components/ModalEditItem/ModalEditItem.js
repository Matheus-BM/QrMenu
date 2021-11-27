import React, { useEffect, useState } from "react";
import "./ModalEditItem.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";

function ModalEditCategora({ onClose = () => {} }) {
  const [categoria, setCategoria] = useState([]);

  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
      .get(`${baseURL}${nomeRestaurante}/categoria`)
      .then((res) => setCategoria(res.data));
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };
  // eslint-disable-next-line
  useEffect(() => {
    ModalActive();
  }, []);

  const editCategoria = () => {
    console.log("edit");
  };

  return (
    <div>
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={ModalDesactive}></div>
          <h1 id="title-category">Escolha o Item</h1>
          <fieldset id="field">
            <div className="categories">
              {categoria.map((categoria, id) => (
                <div id="category" key={id++}>
                  <h2 className="h2">{categoria.nome_categoria}</h2>
                  <div
                    className="emoji-side"
                    onClick={() => editCategoria(categoria.cod_categoria)}
                  ></div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default ModalEditCategora;
