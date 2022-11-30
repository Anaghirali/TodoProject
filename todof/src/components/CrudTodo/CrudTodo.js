import React, { Component } from 'react';
import './CrudTodo.css';
import Main from '../template/main/Main';
import axios from 'axios';

const title = "Suas Tarefas";

const urlAPI = "http://localhost:5289/api/todo";
//const urlApiTodos = "http://localhost:5289/api/controller/todo"
const initialState = {
todo: { id: 0, titulo: '', todo:'', tempo: 0},
lista: []
}


const user = JSON.parse(localStorage.getItem("user"));

export default class CrudAluno extends Component {

        state = { ...initialState }

        componentDidMount() {
           /* axios(urlAPI).then(resp => {
                this.setState({lista: resp.data})
            })*/
    
            axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
            .then(resp => {
            this.setState( { lista_aluno: resp.data } );
            },
            (error) => {
            const _mens =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
            this.setState( { mens: _mens });
            }
            );
            
        }

        limpar() {
            this.setState({ todo: initialState.todo });
            }

        salvar() {
            const todo = this.state.todo;
            todo.titulo = String(todo.titulo);
            const metodo = todo.id ? 'put' : 'post';
            const url = todo.id ? `${urlAPI}/${todo.id}` : urlAPI;
            axios[metodo](urlAPI, todo)
            .then(resp => {
            const lista = this.getListaAtualizada(resp.data)
            this.setState({ todo: initialState.todo, lista })
    })
}

        getListaAtualizada(todo, add = true) {
        const lista = this.state.lista.filter(a => a.id !== todo.id);
        if (add) lista.unshift(todo);
        return lista;
}

        atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const todo = { ...this.state.todo };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        todo[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ todo });
        }

        carregar(todo) {
            this.setState({ todo })
        }

        remover(todo) {
            const url = urlAPI + "/" + todo.id;
            if (window.confirm("Confirma remoção do todo: " + todo.titulo)) {
                console.log("entrou no confirm");
            axios['delete'](url, todo)
            .then(resp => {
            const lista = this.getListaAtualizada(todo, false)
            this.setState({todo: initialState.todo, lista })
            })
            }
        }

        renderForm() {
            return (
                <div className="inclui-container">
                <label> Titulo: </label>
                <input
                type="text"
                id="titulo"
                placeholder="Titulo da Tarefa"
                className="form-input"
                name="titulo"

                value={this.state.todo.titulo}

                onChange={ e => this.atualizaCampo(e)}
            />
            <label> Tarefa: </label>
            <input
            type="text"
            id="todo"
            placeholder="Descrição da Tarefa"
            className="form-input"
            name="todo"

            value={this.state.todo.todo}

            onChange={ e => this.atualizaCampo(e)}
        />
            <label> Tempo: </label>
            <input
            type="number"
            id="tempo"
            placeholder="0"
            className="form-input"
            name="tempo"

            value={this.state.todo.tempo}
            onChange={ e => this.atualizaCampo(e)}
        />
            <button className="btnSalvar"
            onClick={e => this.salvar(e)} >
            Salvar
            </button>
            <button className="btnCancelar"
            onClick={e => this.limpar(e)} >
            Cancelar
            </button>
            </div>
            )
        }



        renderTable() {
            return (
                <div className="listagem">
                    <table className="listTodos" id="tblListaTodos">
                        <thead>
                            <tr className="cabecTabela">
                            <th className="tabTitulo">Titulo da Tarefa</th>
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
                                <td>
                    <button onClick={() => this.carregar(todo)} >
                        Altera
                    </button>
                    </td>
                    <td>
                    <button onClick={() => this.remover(todo)} >
                        Remove
                    </button>
                    </td>
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
            { (this.mens) ? "Erro" + this.mens :
            this.renderForm()},
            {this.renderTable()}
        </Main>
        )
        
    }
}