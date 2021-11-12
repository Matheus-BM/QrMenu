import React,{useState} from "react";

export const ContextlistaDePedidos = React.createContext();


const PedidosProvider = ({children}) =>{

    const [pedidos, setPedidos] = useState([]);

    const addPedido = pedido => {

        
        const newPedido = {
            id: pedido.id,
            nome : pedido.nome,
            categoria:pedido.categoria,
            preco: pedido.preco,
            imgSrc: pedido.imgSrc,
            qt: 1 
        }
        
        

        if (pedidos.find(item => item.id === pedido.id) === undefined){
            setPedidos([...pedidos,newPedido]);
        }else{
             pedidos.forEach((item) => {
                if(item.id === pedido.id ){
                    return { 
                        id: item.id,
                        nome : item.nome,
                        categoria:item.categoria,
                        preco: item.preco,
                        imgSrc: item.imgSrc,
                        qt : item.qt++
                    };
                }
                return item;
                
            }) 
            setPedidos([...pedidos]);
        }
    }

    const deletePedido = pedido =>{

      const arrayPedidos = pedidos;  
        
      const indexPedido =  pedidos.findIndex((item) => {
            return item.id === pedido.id 
        })

       if(indexPedido !== -1 ) {
           if(pedido.qt === 1){
                arrayPedidos.splice(indexPedido,1)
                setPedidos([...arrayPedidos]);
            }else{
                pedidos.forEach((item) => {
                    if(item.id === pedido.id ){
                        return { 
                            id: item.id,
                            nome : item.nome,
                            categoria:item.categoria,
                            preco: item.preco,
                            imgSrc: item.imgSrc,
                            qt : item.qt--
                        };
                    }
                    return item;
                    
                }) 
                setPedidos([...pedidos]);

            }
        } 

    }


    return(
        <ContextlistaDePedidos.Provider value={{pedidos,addPedido,deletePedido}} >
            {children}            
        </ContextlistaDePedidos.Provider>
    )

};

export default PedidosProvider;

export const listMenuItems  = [
    {
        id: 1,
        nome:"Carne", 
        categoria:"Pratos Principais",
        preco: "R$50,00",
        imgSrc:"link" 

    },
    {
        id: 2,
        nome:"Peixe", 
        categoria:"Pratos Principais",
        preco: "R$20,00",
        imgSrc:"link" 

    },
    {
        id: 3,
        nome:"Coca-Cola", 
        categoria:"Bebidas",
        preco: "R$5,00",
        imgSrc:"link" 

    },
    {
        id: 4,
        nome:"Chocolate", 
        categoria:"Sobremesa",
        preco: "R$5,00",
        imgSrc:"link" 

    }
    
]
const categoriasArray = []

listMenuItems.forEach((item)=>{
    if (categoriasArray.findIndex((categoria) => categoria === item.categoria ) === -1){
        categoriasArray.push(item.categoria)
    }    
})

console.log(categoriasArray)
export const categorias = categoriasArray;

