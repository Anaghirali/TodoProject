import './Menu.css'
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';




export default function Menu(props) {

   
    
    return (
        <nav className="menu"> 
        <Link to="/aluno">
                To Do's 
            </Link>
            <Link to="/todo">
                Area do Professor 
            </Link>
           
             (
            <Link to="/login">
            Login
            </Link>
            )
        </nav>
    )
}



