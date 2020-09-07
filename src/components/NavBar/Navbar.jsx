import React, { Component } from 'react';
import NavBarItem from '../NavBar/NavBarItem';
import { APP_NAME } from '../../constants';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [
                { name: "Listar Tarefas", url: "/", active: true},
                { name: "Nova Tarefa", url: "/form", active: false},
            ]
        }

        this.onClickHandler = this.onClickHandler.bind(this);

    }

    onClickHandler(itemClicked) {
        const items = [...this.state.items];

        items.forEach(item => {
            if(item.name === itemClicked.name){
                item.active = true;
            }
            else{
                item.active = false;
            }
        })

        this.setState({ items });
    }
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href={this.state.items.url}>{APP_NAME}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {this.state.items.map((i) =>
                                <NavBarItem
                                    key={i.name}
                                    item={i}
                                    onClick={this.onClickHandler}
                                />
                            )}
                        </ul>
                    </div>
                </nav>


            </div>
        );
    }
}

export default Navbar;