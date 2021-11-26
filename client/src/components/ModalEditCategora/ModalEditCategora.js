import React,{useEffect} from "react";
import "./ModalEditCategora.css";

function ModalEditCategora({onClose=()=>{}}) {

  useEffect(() => {
    ModalActive();
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
        <button id="btnzin" onClick={ModalActive}>
          Click Aqui
        </button>
        <div className="modal">
          <div id="x" onClick={ModalDesactive}></div>
          <h1 id="title-category">Escolha a Categoria</h1>
          <fieldset id="field">
            <div className="categories">
              <div id="category">
                <h2 className="h2">Categoria 1</h2>
                <div className="emoji-side"></div>
              </div>
              <div id="category">
                <h2 className="h2">Categoria 2</h2>
                <div className="emoji-side"></div>
              </div>
              
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default ModalEditCategora;
