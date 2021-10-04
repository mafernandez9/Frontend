/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;