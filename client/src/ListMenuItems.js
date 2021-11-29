import axios from "axios";
import React,{useState, useEffect} from "react";
import { useParams } from "react-router";
import { baseURL } from "./apis/MenuFetcher";
export const ContextlistaDePedidos = React.createContext();

const PedidosProvider = ({children}) =>{

    const [pedidos, setPedidos] = useState([]);
    const [total, setTotal] = useState(0);
    const [menu, setMenu] = useState([])
    const [categoria , setCategoria ] = useState([]);
    const {nomeRestaurante} = useParams();

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
            setTotal(()=> total+(parseFloat( newPedido.preco_produto.substring(3))))
        }else{
             pedidos.forEach((item) => {
                if(item.cod_produto === pedido.cod_produto ){
    
                    var obj = { 
                        cod_produto: item.cod_produto,
                        nome_produto : item.nome_produto,
                        categoria_produto:item.categoria_produto,
                        preco_produto: item.preco_produto,
                        imgSrc_produto: item.imgSrc_produto,
                        qt_produto : item.qt_produto++
                    };
                    setTotal(()=> total+(parseFloat( item.preco_produto.substring(3))))
                    return obj
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
                setTotal(()=> total-(parseFloat( pedido.preco_produto.substring(3))))
            }else{
                pedidos.forEach((item) => {
                    if(item.cod_produto === pedido.cod_produto ){
                        var obj ={ 
                            cod_produto: item.cod_produto,
                            nome_produto : item.nome_produto,
                            categoria_produto:item.categoria_produto,
                            preco_produto: item.preco_produto,
                            imgSrc_produto: item.imgSrc_produto,
                            qt_produto : item.qt_produto--
                        };
                        setTotal(()=> total-(parseFloat( item.preco_produto.substring(3))))
                        return obj
                    }
                    return item;
                    
                }) 
                setPedidos([...pedidos]);

            }
        } 

    }


    function getItens() {
        try {
            
            axios.get(`${baseURL}${nomeRestaurante}`).then((res) => setMenu(res.data));
            axios.get(`${baseURL}${nomeRestaurante}/categoria`).then( response => setCategoria(response.data) )
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        
        getItens();
        return () => {
            
        }
     //// eslint-disable-next-line   
    }, [])

    return(
        <ContextlistaDePedidos.Provider value={{pedidos,addPedido,deletePedido, categoria,menu,total}} >
            {children}            
        </ContextlistaDePedidos.Provider>
    )

};

export default PedidosProvider;