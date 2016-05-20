const path = require('path');
const express = require('express');
import React from 'react';
import { match, RouterContext } from 'react-router';
import { createMemoryHistory, useQueries } from 'history';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import ML from 'maxleap-im';
import createRoutes from '../common/routes';

import configureStore from '../common/store/configureStore';

export default function(req, res){
    let history = useQueries(createMemoryHistory)();
    let location = history.createLocation(req.url);

    let store = configureStore();
    let routes = createRoutes(history);

    match({ routes, location }, (error, redirectLocation, renderProps)=>{
        let html = renderToString(
            <Provider store={store}>
                { <RouterContext {...renderProps}/> }
            </Provider>
        );
        const finalState = store.getState();
        res.send(renderFullPage(html, finalState, 'app'));
    })
}

function renderFullPage(html, initialState, pageName) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>IM Demo</title>
        <link rel="stylesheet" href="${pageName}.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="common.js"></script>
        <script src="${pageName}.js"></script>
      </body>
    </html>
    `
}