import React, { useEffect, useState } from "react";
import "./ModaEditItemData.css";
import axios from "axios";
import { baseURL } from "../../apis/MenuFetcher";
import { getUser } from "../../utils/Common";

function ModalEditItemData({ onClose = () => {},data }) {

  const [categoria, setCategoria] = useState([])
  const user = getUser();
  const nomeRestaurante= user.nomeRestaurante;

  const ModalActive = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    let fundin = document.querySelector("#fundin");
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
    onClose();
  };

  const [codCategoria, setCodCategoria] = useState(data.cod_categoria);
  const [nomeItem, setNomeItem] = useState(data.nome_produto);
  const [descItem, setDescItem] = useState(data.descricao_produto);
  const [precoItem, setPrecoItem] = useState(data.preco_produto);

  const handleSubmit = () => {
    axios
      .post(`${baseURL}EditItem`, {
        cod_categoria: codCategoria,
        nomeItem: nomeItem,
        descItem:descItem,
        precoItem:precoItem,
        cod_produto:data.cod_produto
      })
      .then(ModalDesactive());
  };

  return (
    <div>
      <div id="fundin">
        <div className="modal">
          <div id="x" onClick={() => ModalDesactive()}></div>
          <h1 id="title-category">Edit Item</h1>

          <div id="form-item">
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="name-desc">
                <input
                  id="name-item"
                  placeholder="Nome"
                  type="text"
                  defaultValue ={data.nome_produto}
                  onChange={(e) => setNomeItem(e.target.value)}
                  required
                />
                <input
                  id="input-item-desc"
                  placeholder="Descrição"
                  type="text"
                  defaultValue={data.descricao_produto}
                  onChange={(e) => setDescItem(e.target.value)}
                  required
                />
              </div>
              <div id="price-category">
                <input
                  id="price-item"
                  placeholder="Preço"
                  type="number"
                  defaultValue={parseFloat( data.preco_produto.substring(3))}
                  onChange={(e) => setPrecoItem(e.target.value)}
                  required
                />
                <select
                  id="select-item"
                  defaultValue="0"
                  required
                  onChange={(e) => setCodCategoria(e.target.value) }
                >
                  <option disabled value="0">
                    Padrão
                  </option>
                  {categoria.map((ctg,id)=>(<option value={ctg.cod_categoria} key={ctg.cod_categoria}>{console.log(ctg.cod_categoria)}  {ctg.nome_categoria}</option>))}
                </select>
                  
              </div>
              <button
                id="btn-form-item"
                type="submit"
                onClick={() => handleSubmit()}
              ></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditItemData;
