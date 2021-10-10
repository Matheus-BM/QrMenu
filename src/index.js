
import './App.css';
import Menu from './Pages/Menu';
import Mesa from './Pages/Mesa';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/mesa" component={Mesa} />
      <Route path="/menu" component={Menu}/>
    </div>
    </Router>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

