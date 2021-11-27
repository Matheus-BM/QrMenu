import React, { useEffect, useState } from "react";
import "./ModalRemoveItem.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";

function ModalRemoveCategora({ onClose = () => {} }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
      .get(`${baseURL}${nomeRestaurante}`)
      .then((res) => setItem(res.data));
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };

  const deleteItem = (codItem) => {
    axios
      .post(`${baseURL}deleteItem`, {
        cod_produto: codItem,
      })
      .then(onClose());
  };

  return (
    <div>
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={ModalDesactive}></div>
          <h1 id="title-category">Remova um Item</h1>
          <fieldset id="field">
            <div className="categories">
              {item.map((item, id) => (
                <div id="category" key={id++}>
                  <h2 className="h2">{item.nome_produto}</h2>
                  <div
                    className="emoji-side-trash"
                    onClick={() => deleteItem(item.cod_produto)}
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
