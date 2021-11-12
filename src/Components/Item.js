import React from "react";


const Item = (props)=>{

    const divStyle = {
        backgroundImage: 'url(' + props.src + ')'
      };

    return(
        <div className="box">
            <div className="row" > 
                <div className="image" style={divStyle} ></div>
            <div className="content">
                <h4 >{props.title } </h4>
                <p>{props.price}</p>
            </div>
                <button className="plus"></button>

            </div>
           
        </div>
    );
}

export default Item;