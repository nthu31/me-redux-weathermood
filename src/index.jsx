import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

import Main from 'components/Main.jsx';

window.onload = function() {
    ReactDOM.render(
        <Main />,
        document.getElementById('root')
    );
};
