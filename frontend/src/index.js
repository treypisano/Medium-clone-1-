import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { restoreSession } from './store/csrf';
import usersReducer, { csrfFetch } from './store/usersReducer';
import utilitiesReducer from './store/utilitiesReducer';
import errorsReducer from './store/errorsReducer';
import articlesReducer, { fetchArticles } from './store/articlesReducer';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createUser, loginUser, logoutUser } from './store/usersReducer'; 


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

let currentUser = sessionStorage.getItem('currentUser');
if (currentUser === "null" || currentUser === undefined) { // falsy isnt working(for null), i think because session storage uses strings
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
}

let initialState = {};

if (currentUser) {
  initialState = {
    users: {
    [JSON.parse(currentUser).id]: JSON.parse(currentUser),
    },
    utilities: {
      modalOpen: false
    },
    articles: {

    }
  };
};

const rootReducer = combineReducers({
  users: usersReducer,
  utilities: utilitiesReducer,
  errors: errorsReducer,
  articles: articlesReducer
})

const store = createStore(rootReducer, initialState, enhancer);

fetchArticles()

const initializeApp = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
  );
}

async function testFetchArticles() {
  const res = await csrfFetch('api/articles')
  const data = res.json()

  console.log(data)
}

window.logoutUser = logoutUser
window.testFetchArticles = testFetchArticles
window.store = store

restoreSession().then(initializeApp)