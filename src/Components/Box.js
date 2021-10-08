import React from "react";
import { useState } from "react";



const Box = (props)=>{

    const [count , setCount] = useState(0);

    return(
        <div className="box">
            <h1>{props.Name}</h1>
            <p>{count}</p>
            <button onClick={() => setCount(count +1)} >Add</button>
           
        </div>
    );
}

export default Box;