import React from 'react'

function Modal(props) {
    const handleSubmit = (e)=>{
        e.preventDefault()
    } 

    return (
        <div className="modal-container"   >
            <div className="modal box" >
            <h3 className="modal-title">Adicione um Convidado</h3>
                <form onSubmit={handleSubmit}>
                    
                    <label>Nome:</label>
                    <input className="box innerShadow" type="text" placeholder="Ex.: Pedro" required />
                    <button className="btnAdd" type="submit" onClick={props.onClick} >Adicionar</button>
                </form>  
            </div>
        </div>
    )
}   

export default Modal
