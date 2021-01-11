import React from 'react';

const SignUp1 = React.lazy(() => import('./Components/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const DashboardDefault = React.lazy(() => import('./Components/Dashboard/Default'));
const FormsElements = React.lazy(() => import('./Components/Forms/FormsElements'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
];

export default route;