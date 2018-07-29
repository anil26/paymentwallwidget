import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import { Switch, Route } from 'react-router'
import createBrowserHistory from "history/createBrowserHistory"
import { Router, Switch, Route } from "react-router-dom"
import registerServiceWorker from './registerServiceWorker';
import ConfirmationPage from "Payment/dumbComponents/ConfirmationPage"
ReactDOM.render(
  <Router history={createBrowserHistory()}>
   <Switch>
     <Route exact path="/" component={App} />
     <Route path="/confirmation_page/:status" component={ConfirmationPage} />
   </Switch>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
