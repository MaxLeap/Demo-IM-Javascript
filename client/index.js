import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Immutable, {Map} from 'immutable';
import { Router, Route, browserHistory } from 'react-router';

import ML from 'maxleap-im';

import configureStore from '../common/store/configureStore';
import createRoutes from '../common/routes';
import 'antd/lib/index.css';
// const initialState = window.__INITIAL_STATE__;
// {auth: Immutable.fromJS(initialState)}
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        { createRoutes(browserHistory) }
    </Provider>,
    document.getElementById('root')
);