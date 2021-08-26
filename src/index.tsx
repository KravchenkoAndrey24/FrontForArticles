import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/reduxStore";
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
        <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
        </Provider>,
  document.getElementById('root')
);

reportWebVitals();
