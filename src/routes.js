import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Components/Dashboard/Default'));

const FormsElements = React.lazy(() => import('./Components/Forms/FormsElements'));
const Callback = React.lazy(() => import('./Components/Authentication/Callback'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/callback',  name: 'Callback', component: Callback },
];

export default routes;