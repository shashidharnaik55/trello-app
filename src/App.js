import React, { Component } from 'react';
import Home from "./components/home";
import MyBoard from "./components/board";
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/myboard" component={MyBoard}>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
