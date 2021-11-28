import React, { useEffect, useState } from "react";
import "./ModalEditCategora.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";
import ModalEditCategoriaData from "../ModalEditCategoriaData/ModalEditCategoriaData"

function ModalEditCategora({ onClose = () => {} }) {
  const [categoria, setCategoria] = useState([]);
  const [data, setData] = useState();
  const [toggleModalDataCtg, setToggleModalDataCtg] = useState(false)
  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal.edit.categoria");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin.edit.categoria");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
      .get(`${baseURL}${nomeRestaurante}/categoria`, {
        cod_restaurante: user.idRestaurante,
      })
      .then((res) => setCategoria(res.data));
  };

  const ModalDesactive = () => {
    onClose();
  };
  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  function editCategoria (categoria) {
    setData(categoria);
    setToggleModalDataCtg(true);
  };

  return (
    <div>
        {toggleModalDataCtg?<ModalEditCategoriaData data={data} onClose={() => {setToggleModalDataCtg(false); ModalDesactive() }} />:
       <div className="fundin edit categoria">
        <div className="modal edit categoria">
          <div className="x" onClick={ModalDesactive}></div>
          <h1 className="title-category edit">Escolha a Categoria</h1>
          <fieldset className="field edit categoria">
            <div className="categories edit categoria">
              {categoria.map((categoria, id) => (
                <div className="category" key={id++}>
                  <h2 className="h2">{categoria.nome_categoria}</h2>
                  <div
                    className="emoji-side edit categoria"
                    onClick={() => editCategoria(categoria)}
                  ></div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>}
    </div>
  );
}

export default ModalEditCategora;
