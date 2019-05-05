import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer'

const composeEnhancers = // Для отображения в плагине devtools
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

    const loggerMiddleware = store => next => action => {
        const result = next(action)
        console.log('Middleware', store.getState())
        return result
    }
    
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
        loggerMiddleware,
        reduxThunk
    ))) 


const app = (
    <Provider store = {store}>
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
