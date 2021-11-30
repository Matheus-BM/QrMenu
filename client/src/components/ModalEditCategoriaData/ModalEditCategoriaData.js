import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";


function Modal({ onClose = () => {},data }) {
  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector(".fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };
  useEffect(() => {
    ModalActive();
    // eslint-disable-next-line
  }, []);

  const ModalDesactive = () => {
    

    onClose();
  };

  const [nomeCategoria, setNomeCategoria] = useState(data.nome_categoria);
  const user = getUser();
  const idRestaurante = user.idRestaurante;
  

  const handleSubmit = async () => {
    try {
      await axios
      .post(`${baseURL}editCategoria`, {
        nomeCategoria: nomeCategoria,
        cod_categoria: data.cod_categoria,
        idRestaurante: idRestaurante
      })
      onClose()
      openAlert("Categoria editada")
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
      <div className="fundin">
        <div className="modal">
          <div className="x" onClick={() => ModalDesactive()}></div>
          <h1 className="title-category">Categoria</h1>

          <div className="form-modal">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="name-category"
                placeholder="Nome"
                type="text"
                defaultValue={data.nome_categoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                required
              />
              <select
                className="select-priority"
                defaultValue="0"
                disabled
    
              >
                <option disabled value="0">
                  Prioridade:
                </option>
                <option value="0">Em Breve</option>
              </select>

              <button
                className="btn-form"
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
