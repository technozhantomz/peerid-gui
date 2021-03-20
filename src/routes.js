import React from 'react';
import $ from 'jquery';
import {RouteConstants as Routes} from './constants';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Components/Dashboard/Default'));

const FormsElements = React.lazy(() => import('./Components/Forms/FormsElements'));
const Callback = React.lazy(() => import('./Components/Authentication/Callback/Callback'));
const Account = React.lazy(() => import('./Components/Dashboard/Account'));
const ErrorCallback = React.lazy(() => import('./Components//ErrorCallback/ErrorCallback'));

const routes = [
    { path: Routes.DASHBOARD, exact: true, name: 'Default', component: DashboardDefault },
    { path: Routes.CREATE_APP, exact: true, name: 'Forms Elements', component: FormsElements },
    { path: Routes.CALLBACK,  name: 'Callback', component: Callback },
    { path: Routes.ACCOUNT, exact: true, name: 'Account', component: Account },
    { path: Routes.ERROR_CALLBACK, exact: true, name: 'ErrorCallback', component: ErrorCallback }


];

export default routes;