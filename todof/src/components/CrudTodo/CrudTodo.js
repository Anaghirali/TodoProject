import React, { useEffect,useState} from 'react';
import './CrudTodo.css';
import Main from '../template/main/Main';
import axios from 'axios';
import UserService from '../services/UserService';

const title = "Suas Tarefas";

const urlAPI = "http://localhost:5289/api/todo";
const initialState = {
    todo: { id: 0, titulo: '', todo: '', tempo: 0 },
    lista: []
}


const user = JSON.parse(localStorage.getItem("user"));

export default function CrudAluno() {

    const [lista, setLista] = useState([]);
    const [mens, setMens] = useState([]);
    const [todo, setTodo] = useState({
        id: 0, titulo: '', todo: '', tempo: 0
    });
    const [inputcls, setInputcls] = useState({ id: 0, titulo: '', todo: '', tempo: 0});
    
    
    
    const dadosDosInputs = e => {
        const { name, value } = e.target
        setTodo({
            ...todo,
            [name]: value
        })
    }

    function getListaAtualizada(todo, add = true){
        const lista1 = lista.filter(a => a.id !== todo.id)
        if(add) lista1.unshift(todo)
        return lista1
    }

    const adicionarCurso = async () => {
        const DadosTodo = todo
        todo.codCurso = String(DadosTodo.titulo)
        const metodo = todo.id ? 'put' : 'post'
        const url = todo.id ? `${urlAPI}/${DadosTodo.id}` : urlAPI

        axios[metodo](url, DadosTodo, {headers: {
            Authorization:
                'Bearer ' + user.token
    }})
        .then(resp => {
            let lista = getListaAtualizada(resp.data)
            todo({ DadosTodo: todo.DadosTodo, lista})
            setTodo(lista)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const Cancelar = () => {
        setTodo(inputcls)
    }

    const deletarTodo = async (todo) => {
        const url = urlAPI + "/" + todo.id
        if(window.confirm("Deseja deletar o todo: " + todo.titulo)){
            axios['delete'](url, todo, {headers: {
                Authorization:
                    'Bearer ' + user.token
        }})
            .then(resp => {
                let lista = getListaAtualizada(resp.data)
                todo({ DadosTodo: todo.DadosTodo, lista})
                setTodo(todo)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const alterarTodo = async (todo) => {
        setTodo(todo)
    }

useEffect(() => {
        UserService.getProfessorBoard().then(
            (response) => {
                console.log("useEffect getProfessorBoard: " + response.data)
                setLista(response.data)
                setMens(null);
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMens(_mens);
                console.log("_mens: " + _mens);
            }
        );
    }, [lista]);

    

    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> Titulo: </label>
                <input
                    type="text"
                    id="titulo"
                    placeholder="Titulo da Tarefa"
                    className="form-input"
                    name="titulo"

                    value={todo.titulo}

                    onChange={e => dadosDosInputs(e)}
                />
                <label> Tarefa: </label>
                <input
                    type="text"
                    id="todo"
                    placeholder="Descrição da Tarefa"
                    className="form-input"
                    name="todo"

                    value={todo.todo}

                    onChange={dadosDosInputs}
                />
                <label> Tempo: </label>
                <input
                    type="number"
                    id="tempo"
                    placeholder="0"
                    className="form-input"
                    name="tempo"

                    value={todo.tempo}
                    onChange={dadosDosInputs}
                />
                <button className="btnSalvar"
                    onClick={adicionarCurso} >
                    Salvar
                </button>
                <button className="btnCancelar"
                onClick={Cancelar}
                    >
                    Cancelar
                </button>
            </div>
        )
    }



    const renderTable = () => {
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
                        {lista.map(
                            (todo) =>
                                <tr key={todo.id}>
                                    <td>{todo.titulo}</td>
                                    <td>{todo.todo}</td>
                                    <td>{todo.tempo}</td>
                                    <td>
                                        <button onClick={() => alterarTodo(todo)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deletarTodo(todo)} >
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
   
        return (

            <Main title={title}>
                {(mens) ? "Erro" + mens :
                    renderForm()},
                {renderTable()}
            </Main>
        )

    }
