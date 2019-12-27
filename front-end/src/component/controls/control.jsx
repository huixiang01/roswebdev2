import React from 'react';
// import logo from './logo.svg';
import style from './control.scss';
import { 
  forward, backward, turnLeft, turnRight, setBlue, setGreen, setRed
} from './control_saga.js'

class Control extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Control your robot by using these buttons, OR just simply use your arrow keys!</h2>
          <div className="btn-group" role="group"></div>
          <button id="forward" type="button" onClick={forward}>
            Forward</button>
          <button id="backward" type="button" onClick={backward}>
            Backward </button>
          <button id="left" type="button" onClick={turnLeft}>
            Turn Left</button>
          <button id="right" type="button" onClick={turnRight}>
            Turn right</button>
        </div >

        <div className="jumbotron">
          <h2>
            Changing of turtlesim background color
        </h2>
          <div className="btn-group" role="group"></div>
          <button id="Red" type="button" onClick={setRed}>
            Red
              </button>
          <button id="Green" type="button" onClick={setGreen}>
            Green
              </button>
          <button id="Blue" type="button" onClick={setBlue}>
            Blue
              </button>
        </div >
      </div>
    )
  }
};

export default Control