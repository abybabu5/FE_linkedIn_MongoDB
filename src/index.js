import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './Components/MainPage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import configureStore from "../src/Store/index";
// import trans from "../src/translation"
import "./translation";


ReactDOM.render(
    <Provider store={configureStore()}>
            <MainPage />
    </Provider>,
    document.getElementById("root")
);


serviceWorker.unregister();