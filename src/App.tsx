import React from 'react';
import './App.css';
import routes from './static/js/router'
import { Link } from 'react-router-dom'

class App extends React.Component {
  
    render(){
        const routesLink = routes.map(route => 
                <li key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                </li>
            )
        return (
            <ul>
                {routesLink}
            </ul>
        )
    }
}

export default App;
