import React,{useState} from 'react'
import { Link } from 'react-router-dom';

function UserPedido(props) {
    const divStyle = {
        backgroundImage: 'url(' + props.src + ')',
      };

    const [pedidos,setPedidos] = useState([{ name: "suco" , price: "R$6,00" , qt:3}]) ;
    const [toggleMenu,setToggleMenu] = useState(false);

    const handleToggle = ()=>{
        toggleMenu? setToggleMenu(false):setToggleMenu(true);

    }
    


    return (
        <div className="box col">
            <div className="row" > 
                <div className="image" style={divStyle} ></div>
            <div className="content">
                <h2 >{props.Name } </h2>
                <h6>{props.Role}</h6>
                
                {
                  !toggleMenu?null
                  :<p> {pedidos.map((pedido) =><p className="itemPedido" key={pedido.id}><p>{pedido.name}</p> <p>-  {pedido.qt}</p> <span>x</span> </p>)} 
                  </p>
                }
                
                <p onClick={handleToggle}><i className={!toggleMenu?"fas fa-angle-down":"fas fa-angle-up"}></i> {toggleMenu?"recolher":"expandir"}  </p>
                
               
            </div>
                <Link to="/menu" className="plus"> <button className="plus"></button> </Link>

            </div>
           
        </div>
    )
}

export default UserPedido
