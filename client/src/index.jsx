import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './configureStore.jsx';
import { Provider } from 'react-redux';

const Index = () => (
  <BrowserRouter><App /></BrowserRouter>
);

const store = configureStore();

ReactDOM.render(<Provider store={ store }><Index /></Provider>,document.getElementById('app'));

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
