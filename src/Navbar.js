import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function Navbar() {

  return (
    <div className='navbar'>
      <Link to="/">
        <KeyboardBackspaceIcon className='back-icon' fontSize='large'/>
      </Link>
      <Link to="/">
      <p>Crypto Base</p> 
      </Link>
    </div>
  )
}

export default Navbar