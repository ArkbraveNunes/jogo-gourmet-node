import React from 'react';
import './assets/css/main.css';

// import Home from './pages/Home';
import Home from './pages/HomeDefault';
import Food from './pages/Food';


import { HashRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/food-page" component={Food} />
        </Switch>
        </HashRouter>
    </>
  );
}

export default App;
