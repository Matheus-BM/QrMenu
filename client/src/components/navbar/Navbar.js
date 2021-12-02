import React from 'react'
import"./Navbar.css"
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        
      <nav >
        <ul>
          <li><Link to="/auth">Login</Link> </li>
          <li><Link to="/auth">Registre-se</Link> </li>
        </ul>
      </nav>
    )
}

export default Navbar
