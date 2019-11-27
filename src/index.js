import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import {Provider} from 'react-redux';
import store from './store/store';
//Include bootstrap's css 
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';


//element where we'll mount our react app
const rootElement = document.getElementById("root");

const App = () => (
  // making our redux store available to nested components. 
  <Provider  store={store}>
    <Menu/>
  </Provider>
)

//we render our app over rootElement
ReactDOM.render(<App/>,rootElement);