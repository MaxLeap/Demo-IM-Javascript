import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Login from '../containers/Login';
import Chat from '../containers/Chat';

export default function(history){
    return (
            <Router history={history}>
                <Route path="/" component={Login}></Route>
                <Route path="/chat" component={Chat}></Route>
            </Router>
        )

}