import React, {Fragment} from 'react'
import Title from '../Components/Title'
import ListType from '../Components/ListType'
import { Link } from 'react-router-dom'

function Menu(props) {

    const menu = [
        {
            id: "1",
            name: "File a Parmigiana",
            price: "R$50,00",
            type: "Prato Principal",
            image: "https://media.istockphoto.com/photos/chicken-parmesan-baked-in-tomato-sauce-with-mozzarella-cheese-picture-id506992668?b=1&k=20&m=506992668&s=170667a&w=0&h=C5L8aMc_4JVbUbvKHpNyIv0TySjEe5CHfLelWBpsch8="

            
        },
        {
            id: "2",
            name: "Espaguete ao Pesto",
            price: "R$30,00",
            type: "Prato Principal",
            image: "https://media.istockphoto.com/photos/green-spaghetti-picture-id927699238?b=1&k=20&m=927699238&s=170667a&w=0&h=TnCJAK3y_SjbgjlMbZAvmAIB2LWiCyjnNoJndPqY2_w="

        },
     
        {
            id: "3",
            name: "Coca-Cola",
            price: "R$6,00",
            type: "Bebida",
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvY2ElMjBjb2xhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

        },
     
        {
            id: "4",
            name: "Suco de Laranja",
            price: "R$6,00",
            type: "Bebida",
            image: "https://media.istockphoto.com/photos/glass-of-orange-juice-picture-id167609870?b=1&k=20&m=167609870&s=170667a&w=0&h=MazAGcZUZxRwWKpbujgzr7VFGwSaLkEcPuA-dh_L0Sc="

        },
     
      
    
    ]

    const types= ["Prato Principal", "Bebida"];


    return (
        <Fragment>  

            <div className="header"> 
            <Link to="/mesa"> 
            <button className="btnVoltar" > <i className="fas fa-chevron-left"></i></button>
            </Link>
                <Title name="Cardapio" />

               <div className="box">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Pesquisar" />
                </div>

            </div>

        {types.map((type,id) => (

            <ListType Key={id} Type={type} Menu={menu}/>
            
        ))}

           
            
        </Fragment>
    )
}



export default Menu
