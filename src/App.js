import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import { Component } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            AksTutorials
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container-mt-3">
          <Switch>
            <Route exact path={['/','/tutorials']} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial}/>
            <Route exact path="/tutorials/:id" component={Tutorial}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
