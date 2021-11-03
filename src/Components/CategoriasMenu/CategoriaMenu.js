import React,{Fragment} from 'react'
import { categorias,listMenuItems } from "../../ListMenuItems"
import ItemMenu from '../ItemMenu/ItemMenu'

function CategoriaMenu() {

    return (
        <>

         {
            categorias.map((categoria,i) => (
                <Fragment key ={i++}>

                 <h1> {categoria} </h1> 
            
                 {listMenuItems.filter((item) => item.categoria === categoria).map(
                     item => (<ItemMenu key = {item.id} nome = {item.nome} preco={item.preco} id={item.id} />) )}

                </Fragment>
            ))
         }  
          
        </>
    )
}

export default CategoriaMenu
