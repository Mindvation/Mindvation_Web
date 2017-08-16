import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import HomePage from './components/homePage/HomePage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HomePage/>, document.getElementById('root'));
registerServiceWorker();
