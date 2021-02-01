import React from 'react';
import {RouteConstants as Routes} from './constants';

const SignUp1 = React.lazy(() => import('./Components/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));

const route = [
    { path: Routes.REGISTER, exact: true, name: 'Signup 1', component: SignUp1 },
    { path: Routes.LOGIN, exact: true, name: 'Signin 1', component: Signin1 },
];

export default route;