import React, { useEffect, useState } from "react";
import "./ModalEditItem.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";
import ModalEditItemData from "../ModaEditItemData/ModaEditItemData";

function ModalEditCategora({ onClose = () => {} }) {
  const [item, setItem] = useState([]);
  const [data, setData] = useState();
  const [toggleModalData, setToggleModalData] = useState(false)

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
  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  function editItem (categoria) {
    console.log(categoria);
    setData(categoria);
    setToggleModalData(true);
  };

  return (
    <div>
      { toggleModalData?<ModalEditItemData onClose={() => {setToggleModalData(false); ModalDesactive() }} data={data}/>:
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={()=>ModalDesactive()}></div>
          <h1 id="title-category">Escolha o Item</h1>
          <fieldset id="field">
            <div className="categories">
              {item.map((item, id) => (
                <div id="category" key={id++}>
                  <h2 className="h2">{item.nome_produto}</h2>
                  <div
                    className="emoji-side"
                    onClick={() => editItem(item)}
                  ></div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      }
    </div>
  );
}

export default ModalEditCategora;
