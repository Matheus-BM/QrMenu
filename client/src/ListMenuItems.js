import axios from "axios";
import React,{useState} from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { baseURL } from "./apis/MenuFetcher";
import { getUser } from "./utils/Common";


export const ContextlistaDePedidos = React.createContext();


const PedidosProvider = ({children}) =>{

    const [pedidos, setPedidos] = useState([]);
    

    const addPedido = pedido => {

        
        const newPedido = {
            cod_produto: pedido.cod_produto,
            nome_produto : pedido.nome_produto,
            categoria_produto:pedido.categoria_produto,
            preco_produto: pedido.preco_produto,
            imgSrc_produto: pedido.imgSrc_produto,
            qt_produto: 1 
        }
        
        

        if (pedidos.find(item => item.cod_produto === pedido.cod_produto) === undefined){
            setPedidos([...pedidos,newPedido]);
        }else{
             pedidos.forEach((item) => {
                if(item.cod_produto === pedido.cod_produto ){
                    return { 
                        cod_produto: item.cod_produto,
                        nome_produto : item.nome_produto,
                        categoria_produto:item.categoria_produto,
                        preco_produto: item.preco_produto,
                        imgSrc_produto: item.imgSrc_produto,
                        qt_produto : item.qt_produto++
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
            return item.cod_produto === pedido.cod_produto 
        })

       if(indexPedido !== -1 ) {
           if(pedido.qt_produto === 1){
                arrayPedidos.splice(indexPedido,1)
                setPedidos([...arrayPedidos]);
            }else{
                pedidos.forEach((item) => {
                    if(item.cod_produto === pedido.cod_produto ){
                        return { 
                            cod_produto: item.cod_produto,
                            nome_produto : item.nome_produto,
                            categoria_produto:item.categoria_produto,
                            preco_produto: item.preco_produto,
                            imgSrc_produto: item.imgSrc_produto,
                            qt_produto : item.qt_produto--
                        };
                    }
                    return item;
                    
                }) 
                setPedidos([...pedidos]);

            }
        } 

    }

    const [menu, setMenu] = useState([])

    const [categoria , setCategoria ] = useState([]);
  
    const {nomeRestaurante,idCardapio} = useParams();


    useEffect(() => {
      

        const getMenu = async() =>{
            try {
                const response = await axios.post(`${baseURL}${nomeRestaurante}`,{
                    nomeRestaurante:user.nomeRestaurante
                })
    
                setMenu(response.data)
            } catch (error) {
                console.log(error.message.data)
            }
        }
         getMenu();

    

    }, [nomeRestaurante,idCardapio])

    const user = getUser();

    useEffect(() => {
        
        const getCategoria = async() =>{
            try {
                const response = await axios.post(`${baseURL}${nomeRestaurante}/categoria`,{
                    cod_restaurante : user.idRestaurante
                  })

                setCategoria(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
         getCategoria();
    }, [nomeRestaurante,idCardapio])


    return(
        <ContextlistaDePedidos.Provider value={{pedidos,addPedido,deletePedido, categoria,menu}} >
            {children}            
        </ContextlistaDePedidos.Provider>
    )

};

export default PedidosProvider;