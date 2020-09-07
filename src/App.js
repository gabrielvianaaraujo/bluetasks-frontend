import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import TaskListTable from './components/TaskListTable/TaskListTable';
import Login from './components/Login/Login';
import TaskForm from './components/TaskForm/TaskForm';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <div className="container">
          <Switch>
            
              <Route exact path="/login" component={Login} />
              <Route exact path="/form" component={TaskForm} />
              <Route exact path="/form/:id" component={TaskForm} />
              <Route path="/" component={TaskListTable} />
            
          </Switch>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
