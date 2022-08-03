import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './_config/install';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);
ReactDOM.unstable_createRoot(rootElement).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
