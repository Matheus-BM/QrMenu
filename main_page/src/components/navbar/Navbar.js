import React from 'react'
import"./Navbar.css"
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        
      <nav >
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="">Como funciona?</Link> </li>
          <li><Link to="/">Custos</Link> </li>
        </ul>
      </nav>
    )
}

export default Navbar
