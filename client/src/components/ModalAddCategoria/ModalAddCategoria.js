import React, { useEffect, useState } from "react";
import "./ModalAddCategoria.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";

function Modal({ onClose = () => {} }) {
  const user = getUser();
  const idRestaurante = user.idRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal.add.categoria");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin.add.categoria");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };
  // eslint-disable-next-line
  useEffect(() => {
    ModalActive();
  }, []);

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal.add.categoria");
    modal.style.display = "none";

    let fundin = document.querySelector(".fundin.add.categoria");
    fundin.style.backgroundColor = "transparent";

    onClose();
  };

  const [nomeCategoria, setNomeCategoria] = useState("");
  const [priority, setPriority] = useState("0");

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${baseURL}addCategoria`, {
          nomeCategoria: nomeCategoria,
          priority: priority,
          idRestaurante: idRestaurante,
        })
        
        ModalDesactive()
        openAlert("Categoria adionada")
        setTimeout(()=>{
          document.querySelector('.alert#confirm').classList.remove("show");
          document.querySelector('.alert#confirm').classList.add("hide");
        },2000);
       
      
    } catch (error) {
      openAlert(error.response.data.msg)
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
      <div className="fundin add categoria">
        <div className="modal add categoria">
          <div className="x" onClick={() => ModalDesactive()}></div>
          <h1 className="title-category add">Categoria</h1>

          <div className="form-modal add categoria">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="name-category add"
                placeholder="Nome"
                type="text"
                onChange={(e) => setNomeCategoria(e.target.value)}
                required
              />
              <select
                className="select-priority add categoria"
                defaultValue="0"
                disabled
                onChange={(e) => setPriority(e.target.value)}
              >
                <option disabled value="0">
                  Prioridade:
                </option>
                <option value="0">Em Breve</option>
              </select>

              <button
                className="btn-form add categoria"
                type="submit"
                onClick={() => handleSubmit()}
              ></button>
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
