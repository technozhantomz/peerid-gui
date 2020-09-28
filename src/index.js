import {Provider} from 'react-redux';
import configureStore, {history} from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {PeerplaysService} from './services';
import {GenUtil} from './utility';
// Initialize store
const store = configureStore();
PeerplaysService.init(store);
GenUtil.initConsole();

const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App history={ history } />
    </Provider>,
    document.getElementById('content')
  );
};

render();
