import './Menu.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';




export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
    setCurrentUser(user);
    }
    }, []);

    return (
        <nav className="menu">
            <Link to="/aluno">
                To Do's
            </Link>
            <Link to="/todo">
                Area do Professor
            </Link>

            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
        </nav>
    )
}



