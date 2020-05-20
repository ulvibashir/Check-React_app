import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/App.css'
import './styles/loader.css'

import { AuthPage, SearchPage, DetailsPage } from './components';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route path="/search/:id" component={SearchPage} />
        <Route path="/details/:key" component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
