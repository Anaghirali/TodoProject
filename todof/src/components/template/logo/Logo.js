import logo from '../../../assets/imagens/logotodo.png';
import React from 'react';
import './Logo.css';

const Logo = (props) => {
    return(
        <aside className="logo ">
            <a href="/" className='logo'>
                <img src={ logo } alt="logo"/>
            </a>    
        </aside>
    )
}

export default Logo;