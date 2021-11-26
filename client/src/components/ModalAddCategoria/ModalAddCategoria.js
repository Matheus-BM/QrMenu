import React,{useEffect} from "react";
import "./ModalAddCategoria.css";

function Modal({onClose=()=>{}}) {

  useEffect(() => {
    ModalActive()
  }, [])

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };

  const ModalDesactive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let fundin = document.querySelector("#fundin");
    fundin.style.backgroundColor = "transparent";
    onClose();
  };

  return (
    <div>
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={()=> ModalDesactive()}></div>
          <h1 id="title-category">Categoria</h1>

          <div id="form-modal">
            <form>
              <input placeholder="Nome" type="text" required />
              <select defaultValue="1" required>
                <option disabled value="1">
                  Prioridade
                </option>
                <option value="2">dormir</option>
                <option value="3">acordar</option>
              </select>

              <button id="btn-form"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
