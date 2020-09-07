import React, { Component } from 'react';
import { Alert } from '../Alert/Alert';
import AuthService from '../../api/AuthService';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            password: '',
            alert: null,
            processing: false,
            loggedIn: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.setState({ processing: true });
        alert('login front');
        AuthService.login(this.state.username, this.state.password,
            success => {
                if (success) {
                    this.setState({ loggedIn: true, processing: false });
                    this.props.onLoginSuccess();
                } else {
                    this.setState({ alert: "O login não pode ser realizado", processing: false });
                }
                this.setState({ processing: false });
        });
    }

    handleInputChanged(event){
        const field = event.target.name;
        const value = event.target.value;

        this.setState({[field]: value});
        
    }

    render() {
        if (AuthService.isAuthenticated() || this.state.loggedIn) {
            return <Redirect to="/" />
        }
        return (
            <div className="container w-50 py-5">
                <h1>Login</h1>
                { this.state.alert !== null ? <Alert message={this.state.alert} /> : "" }
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            onChange={this.handleInputChanged}
                            value={this.state.username}
                            placeholder="Digite o Usuário"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={this.handleInputChanged}
                            value={this.state.password}
                            placeholder="Digite a senha"
                            className="form-control"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={this.state.processing}>Login</button>
                        
                </form>
            </div>
        );
    }
}

export default Login;