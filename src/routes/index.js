import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Callback from '../components/Callback';
import ErrorCallback from '../components/ErrorCallback';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ResetForm from '../components/ForgotPassword/ResetForm';
import CreateApp from '../components/CreateApp';
import {RouteConstants as Routes} from '../constants';

// https://github.com/supasate/connected-react-router/blob/master/examples/immutable/src/routes/index.js

const routes = (
  <>
    <Switch>
      <Route exact path={ Routes.ROOT } component={ Home }/>
      <Route path={ Routes.RESET_PASSWORD } component={ ResetForm }/>
      <Route path={ Routes.DASHBOARD } component={ Dashboard }/>
      <Route path={ Routes.CALLBACK } component={ Callback }/>
      <Route path={ Routes.ERROR_CALLBACK } component={ ErrorCallback } />
      <Route path={ Routes.LOGIN } component={ Login }/>
      <Route path={ Routes.REGISTER } component={ Register }/>
      <Route path={ Routes.CREATE_APP } component={ CreateApp }/>
    </Switch>
  </>
);

export default routes;
