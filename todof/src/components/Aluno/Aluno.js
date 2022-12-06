import React, { Component } from 'react';
import './Aluno.css';
import Main from '../template/main/Main';
import axios from 'axios';


const title = "Suas Tarefas";

const urlAPI = "http://localhost:5289/api/aluno";
const initialState = {
todo: { id: 0, titulo: '', todo:'', tempo: 0},
lista: []
}

const user = JSON.parse(localStorage.getItem("user"));

export default class CrudAluno extends Component {

        state = { ...initialState }

        componentDidMount() {
            axios(urlAPI, {headers: {
                Authorization:
                    'Bearer ' + user.token
        }}).then(resp => {
                this.setState({lista: resp.data})
            })
        }

        

        renderTable() {
            return (
                <div className="listagem">
                    <table className="listTodos" id="tblListaTodos">
                        <thead>
                            <tr className="cabecTabela">
                            <th className="tabTitulo">Titulo da Tarefa </th>
                            <th className="tabTituloTodo">Explicação</th>
                            <th className="tabTituloTempo">Tempo em dias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (todo) =>
                                <tr key={todo.id}>
                                <td>{todo.titulo}</td>
                                <td>{todo.todo}</td>
                                <td>{todo.tempo}</td>
                    </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}