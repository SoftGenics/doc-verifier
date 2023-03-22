import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from 'axios'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'
import { start, stop } from "./util/progress";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Others");
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log("Storage errors");
  }
};

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState({
  	admin: store.getState().admin,
  	college: store.getState().college,
  	company: store.getState().company,
    student:store.getState().student,
    loginInfo: store.getState().loginInfo
  });
});

axios.interceptors.request.use((request) => {
  start()
  const token = store.getState().loginInfo?.token;
  request.headers.Authorization = token;
  return request;
})

axios.interceptors.response.use((response) => {
  stop();
  return response;
})



ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  ,document.getElementById('root')
);