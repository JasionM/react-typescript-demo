import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './static/js/router'

const routesComponents = routes.map(route => 
        <Route key={route.path} path={route.path} component={route.component}></Route>
    )

ReactDOM.render((
    <Router>
        <Route path='/index' component={App}></Route>
        {routesComponents}
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
