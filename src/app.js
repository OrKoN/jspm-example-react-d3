import React from 'react';
import ReactDOM from 'react-dom';
import { MainComponent } from './MainComponent.js';

let container = document.getElementById('container');
let component = ReactDOM.render(React.createElement(MainComponent), container);