import React, { useEffect, useState } from "react";
import "./ModalEditItem.css";
import axios from "axios";
import { baseURL } from "../../../apis/MenuFetcher";
import { getUser } from "../../../utils/Common";
import ModalEditItemData from "../ModaEditItemData/ModaEditItemData";

function ModalEditCategora({ onClose = () => {} }) {
  const [item, setItem] = useState([]);
  const [data, setData] = useState();
  const [toggleModalData, setToggleModalData] = useState(false)
  const [categoria,setCategoria] =useState([]);
  var itemCtg ='';

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



  return (
    <div>
      { toggleModalData?<ModalEditItemData onClose={() => {setToggleModalData(false); ModalDesactive() }} data={data}/>:
      <div className="fundin">
        <div className="modal">
          <div className="x" onClick={()=>ModalDesactive()}></div>
          <h1 className="title-category">Escolha o Item</h1>
          <fieldset className="field">
            <div className="categories">

              { categoria.map((categoria) =>(
                <>
                 <hr></hr>
                 <h1>{categoria.nome_categoria}</h1>
                {
                  item.filter(item => item.cod_categoria === categoria.cod_categoria).map((item, id) => (
                  <div className="category" key={id++}>
                    <h3 className="h2">  {`${item.nome_produto}`} </h3>
                    <div className="emoji-side"onClick={() => editItem(item)}></div>
                  </div>
                  ))
                }

                </>
              ))
              
              
              
              }
            </div>
          </fieldset>
        </div>
      </div>
      }
    </div>
  );
}

export default ModalEditCategora;
