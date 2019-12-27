import React from 'react';
// import logo from './logo.svg';
import style from './../App.css';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className={style.app} >
        <div class="row">
          <div class="col-md-12">
            <h3>Hi there</h3>
            <h4>Brief introduction:</h4>
            <hr/>
            <h5>This webpage will interact with the ROS master currently running on the local system, so for example you could run turtlesim to test the functionality of this webpage. The final intended use could be to implement it on the robot, or to take it a step further there could be a server running on the robot in the background whereas the webpage can be on the laptop and easily communicating with the robot without having to SSH.</h5>
            <h3>Welcome to the Main Page. Apologies for the half done work but there was a lack of time and knowledge.<br /></h3>
            <p>
              - Settings: Main idea was to change the settings of the robot, i.e setting the IP address, and saving it into a YAML file for loading next time. (The Bootstrap accordion looks pretty bad but if you load it up using Visual Studio Code's Live Server it'll look better<br />
              - Monitoring: Main idea was to monitor the status of the robot, i.e monitoring nodes, topics, params, battery level. <br />
              - Controls: Main idea was to control the robot, i.e sending out action servers commands/fleet commands for the robot. Current features include using buttons to teleoperate the robot as well as using the keyboard arrow keys. Look inside the Javascript file for more details.<br />
            </p>
            <p align="right">
              -Pei Yuan
                </p>
          </div>
        </div>
      </div>

    );
  };
};

export default Home;
