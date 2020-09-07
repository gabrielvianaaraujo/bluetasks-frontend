import React, { Component } from 'react';
import TaskService from '../../api/TaskService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import './estilos.css';
import { Alert } from '../Alert/Alert';
import AuthService from '../../api/AuthService';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import Moment from 'react-moment';

class TaskListTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            editId: 0,
            loading: true,
            alert: null,
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }

    componentDidMount() {
        this.listTasks();
    }

    listTasks() {
        if(!AuthService.isAuthenticated()) return;

        this.setState({ loading: true });
        TaskService.list(
            tasks => this.setState({tasks: tasks, loading: false}),
            error => this.setErrorState(error)
        )
    }

    setErrorState(error){
        this.setState({alert: `Erro na requisição: ${error.message}`, loading:false})
    }

    onDeleteHandler(id) {
        if (window.confirm("Deseja mesmo excluir esta tarefa?")) {
            console.log(`Task: ${id} Será excluida`);
            TaskService.delete(id, 
                () => {
                    this.listTasks();
                    toast.success("Tarefa excluída!", {position: toast.POSITION.BOTTOM_LEFT})
                },
                error => this.setErrorState(error))
            
        }
    }

    onEditHandler(id) {
        this.setState({editId: id});
    }

    onStatusChangeHandler(task) {
       task.done = !task.done;
       TaskService.save(task);
       this.listTasks();
    }

    render() {

        if(!AuthService.isAuthenticated()){
            return <Redirect to="/login" />
        }

        if(this.state.editId){
            return <Redirect to={`/form/${this.state.editId}`} />
        }

        return (
            <div className="container-fluid w-75 mt-3">
                
                {this.state.alert !== null? <Alert message = {this.state.alert} /> : ''}
                
                {this.state.loading === true ? <Spinner /> : 
                    <table className="table table-striped">
                
                    <TableHeader />
                    {this.state.tasks.length > 0? 
                        <TableBody 
                        tasks={this.state.tasks}
                        onStatusChange={this.onStatusChangeHandler}
                        onDelete={this.onDeleteHandler}
                        onEdit={this.onEditHandler}
                        />
                        :
                        <EmptyTableBody />
                    }       
                </table>}
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

const TableHeader = () => {
    return(
        <thead className="thead-dark">
            <tr>
                <th scope="col">Status</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    return (
        <tbody>
            {props.tasks.map( task =>
            <tr className={task.done ? "done" : ""} key={task.id}>
                <td><input type="checkbox" onChange={() => props.onStatusChange(task)} checked={task.done}/></td>
                <td>{task.description}</td>
                <td><Moment format="DD/MM/YYYY">{task.whenToDo}</Moment> </td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => props.onEdit(task.id)}>Editar</button>
                    <button 
                        type="button" 
                        className="btn btn-danger ml-2"
                        onClick={() => props.onDelete(task.id)}>Excluir</button>
                </td>
            </tr>
        )}
        </tbody>
    )
}

const EmptyTableBody = (props) =>{
    return(
        <tbody>
            <tr>
                <td colSpan="4">Não existem tarefas</td>
            </tr>
        </tbody>
    )
}

export default TaskListTable;