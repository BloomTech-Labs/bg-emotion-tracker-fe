import React from 'react';
import ReactDOM from 'react-dom';
import LibzyRoot from 'libzy-lib';
import LibzyConfig from '../libzy.config';

ReactDOM.render(
    <LibzyRoot config={LibzyConfig} />,
    document.getElementById('root')
);
