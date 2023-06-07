import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginForm/index';
import Splash from './components/Splash/index';
import ShowPage from './components/ShowPage';
import CreateArticle from './components/CreateArticle';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/articles/create">
            <CreateArticle />
          </Route>
          <Route path="/articles/:articleId">
            <ShowPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
