import React from 'react';
import ReactDOM from 'react-dom/client';

import { Map } from './components/map';

window.React = React;
const root = ReactDOM.createRoot(document.getElementById('map'));

root.render(<Map />);