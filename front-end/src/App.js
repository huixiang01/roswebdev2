import React from 'react';
import logo from './logo.svg';
import style from './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './component/home'
import Control from './component/controls/control'
import Monitoring from './component/Monitoring/monitoring'
import Settings from './component/settings/setting'


// var ROSLIB = require('roslib');

// var ros = new ROSLIB.Ros({
//   url: 'ws://localhost:9090'
// });

// ros.on('connection', function () {
//   console.log('Connected to websocket server.');
// });

// ros.on('error', function (error) {
//   console.log('Error connecting to websocket server: ', error);
// });

// ros.on('close', function () {
//   console.log('Connection to websocket server closed.');
// });

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div className={style.app} >
          <nav className={style.appbar}>
            <div className= {style.navbarcontainer}><Link to="/home">Home</Link></div>
              <div className= {style.navbarcontainer}><Link to="/controls">Controls</Link></div>
              <div className= {style.navbarcontainer}><Link to="/monitoring">Monitoring</Link></div>
              <div className= {style.navbarcontainer}><Link to="/settings">Settings</Link></div>  
          </nav>
          <Switch>
            <Route path="/home"> <Home/> </Route>
            <Route path="/controls"> <Control/> </Route>
            <Route path="/monitoring"><Monitoring/></Route>
            <Route path="/settings"><Settings/></Route>
          </Switch>
        </div>
      </Router>
    );
  };
};

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }
//   render() {
//     return (
//       <div className={style.app} >
//         <
//       </div>)

//   };
// }


export default App;
