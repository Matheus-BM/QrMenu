import React from 'react'
import './ModalPedido.css'
import { useContext } from 'react'
import { ContextlistaDePedidos } from '../../ListMenuItems'

const ModalPedido = ( ) => {

    const {pedidos} = useContext(ContextlistaDePedidos)


    return (
        <div className="Modal">
            <h2>Pedidos</h2>
            <ul>{pedidos.map((item,i)=> <li key = {i++}>{item.nome} <p>{item.qt}</p></li>)}</ul>
        </div>
    )
}

export default ModalPedido
