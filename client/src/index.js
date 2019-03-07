import React from 'react'
import { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import Profil from './Profil';
import PageSeries from './PageSeries';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";

setGlobal({
    connexion: false,
    user: undefined,
    seriesUser: undefined
});

const Root = () => (
    <BrowserRouter>
        <Switch>
           <Route exact path='/' component={ App } />
           <Route exact path="/profil" component={ Profil } />
           <Route exact path='/serie/:id' component={ PageSeries } />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
