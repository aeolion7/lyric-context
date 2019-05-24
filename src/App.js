import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';

const App = () => {
  return (
    <Provider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
};

export default App;
