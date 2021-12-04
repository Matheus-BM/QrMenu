import React, { useEffect, useState } from "react";

import axios from "axios";
import { baseURL } from "../../../apis/MenuFetcher";
import { getUser } from "../../../utils/Common";

function ModalRemoveCategora({ onClose = () => {} }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  const user = getUser();
  const nomeRestaurante = user.nomeRestaurante;
  const [categoria,setCategoria] =useState([]);

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

  const deleteItem = (codItem) => {
    console.log()
    axios
      .post(`${baseURL}deleteItem`, {
        cod_produto: codItem,
      })
      .then(onClose()).then(
         openAlert("Item removido")
       
      ).then( setTimeout(()=>{
        document.querySelector('.alert#confirm').classList.remove("show");
        document.querySelector('.alert#confirm').classList.add("hide");
      },2000));
  };

  function openAlert(msg){
    document.querySelector('.alert').classList.add("show");
    document.querySelector('.alert').classList.remove("hide");
    document.querySelector('.alert').classList.add("showAlert");
    document.querySelector('.msg').textContent = msg

  }

  return (
    <div>
      <div className="fundin">
        <div className="modal">
          <div className="x" onClick={ModalDesactive}></div>
          <h1 className="title-category">Remova um Item</h1>
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
                    <div className="emoji-side-trash"onClick={() => deleteItem(item.cod_produto)}></div>
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
    </div>
  );
}

export default ModalRemoveCategora;
