import React ,{Fragment} from 'react'
import Item from './Item'

function ListType(props) {
    return (
        <Fragment>
            <h2 id={props.type}>{props.Type}</h2>

            {
                props.Menu.filter( item => item.type === props.Type).map((item) => (
                    <Item src={item.image} key={item.name} title={item.name} price={item.price}>  </Item>
                ))
            }
            
        </Fragment>
    )
}

export default ListType
