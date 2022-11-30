import React, { useEffect, useState } from 'react';
import { Routes, Route,  } from "react-router-dom";
import Main from "./components/template/main/Main";
import CrudTodo from "./components/CrudTodo/CrudTodo";
import Aluno from "./components/Aluno/Aluno";
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import AuthService from "./components/services/AuthService";



export default function Rotas ()  {
    
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
    const user = AuthService.getCurrentUser();
        if (user) {
    setCurrentUser(user);
    }
    }, []);
 

    return(
        <Routes>
            <Route exact path = '/'
                element={
                    <Main title = "Bem Vindo!">
                        <div>Lista de tarefas do Curso</div>
                    </Main>
                }/>

                {currentUser ? (
                <Route exact path = '/aluno' element={<Aluno />}/>
                ) : (
                    //se não
                <Route exact path='/aluno'
                element={
                <Main title="Visualização das atividades">
                <div>Não autorizado! voce nao é aluno</div>
                </Main>
                }
                />
                )}

                {currentUser ? (
                <Route exact path = '/todo' 
                element={<CrudTodo />}/>
                ) : (
                    //se não
                <Route exact path='/todo'
                element={
                <Main title="Cadastro de atividades">
                <div>Area destinada à professores</div>
                </Main>
                }/>
                )}


            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />

        </Routes>
    )
}

