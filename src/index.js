import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuoteApp from './QuoteApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<QuoteApp />, document.getElementById('root'));
registerServiceWorker();
