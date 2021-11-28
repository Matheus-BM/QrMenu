import React, { useEffect, useState } from "react";
import "./ModalRemoveCategoria.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";

function ModalRemoveCategora({ onClose = () => {} }) {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal.remove.categoria");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin.remove.categoria");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
      .get(`${baseURL}${nomeRestaurante}/categoria`, {
        cod_restaurante: user.idRestaurante,
      })
      .then((res) => setCategoria(res.data));
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal.remove.categoria");
    modal.style.display = "none";

    let fundin = document.querySelector(".fundin.remove.categoria");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };

  const deleteCategoria = (codCategoria) => {
    axios
      .post(`${baseURL}deleteCategoria`, {
        cod_categoria: codCategoria,
      })
      .then(onClose());
  };

  return (
    <div>
      <div className="fundin remove categoria">
        <div className="modal remove categoria">
          <div className="x" onClick={ModalDesactive}></div>
          <h1 className="title-category remove categoria">Remova Categoria</h1>
          <fieldset className="field remove categoria">
            <div className="categories">
              {categoria.map((categoria, id) => (
                <div className="category" key={id++}>
                  <h2 className="h2">{categoria.nome_categoria}</h2>
                  <div
                    className="emoji-side-trash"
                    onClick={() => deleteCategoria(categoria.cod_categoria)}
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

export default ModalRemoveCategora;
