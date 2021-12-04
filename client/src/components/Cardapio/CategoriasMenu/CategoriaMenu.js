import React, { Fragment,useContext } from "react";
import ItemMenu from "../ItemMenu/ItemMenu";
import { ContextlistaDePedidos } from "../../../CardapioContext";
import "./CategoriaMenu.css";

function CategoriaMenu() {

    const { categoria , menu } = useContext(ContextlistaDePedidos);
  return (
    <div className="all">
      { categoria.map((categoria) =>(
            <Fragment key={categoria.cod_categoria}> 
            <h2>{categoria.nome_categoria}</h2>

            {menu.filter((item) => item.cod_categoria === categoria.cod_categoria).map(item => (<ItemMenu
                key={item.cod_produto}
                nome_produto={item.nome_produto}
                preco_produto={item.preco_produto}
                cod_produto={item.cod_produto}
                descricao_produto={item.descricao_produto}
                
              />)) 
              }
            </Fragment>
      )) 
      
      }
    </div>
  );
}

export default CategoriaMenu;
