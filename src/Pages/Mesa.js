import React,{Fragment, useState} from 'react'
import Title from '../Components/Title'
import UserPedido from '../Components/UserPedido'
import AddConvidado from '../Components/AddConvidado'

function Mesa() {

    const [users,setUsers] = useState([
        {name:"João",
         Role: "Anfitrião",
         img: "https://cdn-icons-png.flaticon.com/512/236/236831.png"
         ,id:"1"
        },{name:"Maria",
        Role: "Convidado",
        img: "https://cdn-icons-png.flaticon.com/512/219/219969.png"
        ,id:"2"
        }
    ]);

    return (
        <Fragment>
            <div>
            <Title name="Mesa 01" />
            {users.map((user)=> <UserPedido key={user.id} Name={user.name} Role={user.Role} src={user.img} />)}
            <AddConvidado/>
            </div>
            <div className="footer"> 
                 <i className="btnCancel far fa-times-circle"></i>
                 <button className="btnNext" > <i className="fas fa-chevron-right"></i></button>
            </div>
        </Fragment>
    )
}

export default Mesa
