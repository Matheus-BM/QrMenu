import React from 'react'

function AddConvidado(props) {
    const divStyle = {
        width: "fit-content",
        cursor:"pointer"
    };
  

    return (
        <div className="box" style={divStyle}>
            <div className="addIcon"  ></div>
            <h4 className="add">Adicionar Convidado</h4>
        </div>
    )
}

export default AddConvidado
