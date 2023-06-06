import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginForm/index';
import Splash from './components/Splash/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
