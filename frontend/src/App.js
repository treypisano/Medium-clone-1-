import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginForm/index';
import Splash from './components/Splash/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/">
            <Splash />
          </Route>
          <Route path="/test">  
          {/* This is a test route, needs to be on for modal to work, this will be home eventaully */}
            <Splash />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
