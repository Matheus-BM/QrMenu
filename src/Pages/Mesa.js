import React,{Fragment, useState} from 'react'
import Title from '../Components/Title'
import UserPedido from '../Components/UserPedido'
import AddConvidado from '../Components/AddConvidado'
import Modal from '../Components/Modal'

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

    const [toggleModal,setToggleModal] = useState(false);
    const handleModal = (e)=>{
        e.preventDefault()
        toggleModal?setToggleModal(false):setToggleModal(true)
    }

    return (
        <Fragment>
            <div>
            <Title name="Mesa 01" />
            {users.map((user)=> <UserPedido key={user.id} Name={user.name} Role={user.Role} src={user.img} />)}
            <a href="" onClick={handleModal}><AddConvidado /></a> 
            </div>
            <div className="footer"> 
                 <i className="btnCancel far fa-times-circle"></i>
                 <button className="btnNext" > <i className="fas fa-chevron-right"></i></button>
            </div>
            {
                toggleModal? <Modal onClick={handleModal}/>: null
            }

        </Fragment>
    )
}

export default Mesa
