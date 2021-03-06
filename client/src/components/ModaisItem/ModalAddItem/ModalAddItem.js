import React, { useEffect, useState } from "react";
import "./ModalAddItem.css";
import axios from "axios";
import { baseURL } from "../../../apis/MenuFetcher";
import { getUser } from "../../../utils/Common";

function Modal({ onClose = () => {} }) {

  const [categoria, setCategoria] = useState([])
  const user = getUser();
  const nomeRestaurante= user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    axios
    .get(`${baseURL}${nomeRestaurante}/categoria`)
    .then((res) => setCategoria(res.data));
  };
  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector(".fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };

  const [nomeCategoria, setNomeCategoria] = useState("");
  const [nomeItem, setNomeItem] = useState("");
  const [descItem, setDescItem] = useState("");
  const [precoItem, setPrecoItem] = useState("");

  const handleSubmit = async () => {
     try {
     await axios
        .post(`${baseURL}addItem`, {
          nomeCategoria: nomeCategoria,
          nomeItem: nomeItem,
          descItem:descItem,
          precoItem:precoItem,
          nomeRestaurante:user.nomeRestaurante
        })
        ModalDesactive();
        openAlert("Item adionado")
        setTimeout(()=>{
          document.querySelector('.alert#confirm').classList.remove("show");
          document.querySelector('.alert#confirm').classList.add("hide");
        },2000);
      
    } catch (error) {
      openAlert(error.response.data.msg);
    }
  };


  
  function openAlert(msg){
    document.querySelector('.alert').classList.add("show");
    document.querySelector('.alert').classList.remove("hide");
    document.querySelector('.alert').classList.add("showAlert");
    document.querySelector('.msg').textContent = msg

  }

  function closeAlert(){
    document.querySelector('.close-btn')
    document.querySelector('.alert').classList.remove("show");
    document.querySelector('.alert').classList.add("hide");
    
  }

  return (
    <div>
      <div className="fundin">
        <div className="modal">
          <div className="x" onClick={() => ModalDesactive()}></div>
          <h1 className="title-category">Item</h1>

          <div className="form-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="name-desc">
                <input
                  className="name-item"
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => setNomeItem(e.target.value)}
                  required
                />
                <input
                  className="input-item-desc"
                  placeholder="Descri????o"
                  type="text"
                  onChange={(e) => setDescItem(e.target.value)}
                  required
                />
              </div>
              <div className="price-category">
                <input
                  className="price-item"
                  placeholder="Pre??o"
                  type="number"
                  onChange={(e) => setPrecoItem(e.target.value)}
                  onkeypress="return event.charCode >= 48" min="1"
                  oninput="validity.valid||(value='');"
                  required
                />
                <select
                  className="select-item"
                  defaultValue="0"
                  onChange={(e) => setNomeCategoria(e.target.value)}
                >
                  <option disabled value="0">
                    Categoria:
                  </option>
                  {categoria.map((ctg,id)=>(<option value={ctg.nome_categoria} key={id++}>{ctg.nome_categoria}</option>))}
                </select>
                  
              <button
                className="btn-form item"
                type="submit"
                onClick={() => handleSubmit()}
              ></button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="alert hide">
         <span className="fas fa-exclamation-circle"></span>
         <span className="msg">Warning: This is a warning alert!</span>
         <div className="close-btn" onClick={()=> closeAlert()}>
            <span className="fas fa-times"></span>
         </div>
      </div>
    </div>
  );
}

export default Modal;
