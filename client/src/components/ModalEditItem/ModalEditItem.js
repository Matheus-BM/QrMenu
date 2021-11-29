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
  const [categoria,setCategoria] =useState([]);

  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
      .get(`${baseURL}${nomeRestaurante}`)
      .then((res) => setItem(res.data)).catch(e => console.log(e));

      axios
      .get(`${baseURL}${nomeRestaurante}/categoria`, {
        cod_restaurante: user.idRestaurante,
      })
      .then((res) => setCategoria(res.data)).catch(e => console.log(e));;
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector(".fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };
  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  function editItem (categoria) {
    setData(categoria);
    setToggleModalData(true);
  };

  function getCategoria(cod_categoria){
    categoria.forEach(ctg => {
      if(ctg.cod_categoria === cod_categoria){
      return ctg.nome_categoria
      }
      return ""
    } )
  }

  return (
    <div>
      { toggleModalData?<ModalEditItemData onClose={() => {setToggleModalData(false); ModalDesactive() }} data={data}/>:
      <div className="fundin">
        <div className="modal">
          <div className="x" onClick={()=>ModalDesactive()}></div>
          <h1 className="title-category">Escolha o Item</h1>
          <fieldset className="field">
            <div className="categories">
              {item.map((item, id) => (
                <div className="category" key={id++}>
                  <h2 className="h2">{`${item.nome_produto} - ${getCategoria(item.cod_categoria)}`}</h2>
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
