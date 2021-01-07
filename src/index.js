import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import config from './config';

import {PeerplaysService} from './services';
import {GenUtil} from './utility';
import configureStore, { history } from './store/configureStore';
const store = configureStore();
PeerplaysService.init(store);
GenUtil.initConsole();  

// const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App history={history} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('content'));

serviceWorker.unregister();

