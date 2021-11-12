import React, { Fragment,useContext } from "react";
import ItemMenu from "../ItemMenu/ItemMenu";
import { ContextlistaDePedidos } from "../../ListMenuItems";
import "./CategoriaMenu.css";

function CategoriaMenu() {

    const { categoria , menu } = useContext(ContextlistaDePedidos);
  return (
    <div className="all">
      { categoria.map((categoria) =>(
            <Fragment key={categoria.cod_categoria}> 
            <h1>{categoria.nome_categoria}</h1>

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
      
      
      /*categorias.map((categoria, i) => (
        <Fragment key={i++}>
          <h1> {categoria} </h1>

          {pedidos
            .filter((item) => item.categoria === categoria)
            .map((item) => (
              <ItemMenu
                key={item.id}
                nome={item.nome}
                preco={item.preco}
                id={item.id}
              />
            ))}
        </Fragment>
            ))*/}
    </div>
  );
}

export default CategoriaMenu;
