import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'

function Redirect({path}) {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(path);
    }) 

    return (
        <div>
            Loading ...
        </div>
    )
}

export default Redirect
