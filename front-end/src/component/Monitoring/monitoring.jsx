import React from 'react';
// import logo from './logo.svg';
import style from './monitoring.scss';


var ROSLIB = require('roslib');

var ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

ros.on('connection', function () {
  console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
  console.log('Connection to websocket server closed.');
});

var listener = new ROSLIB.Topic({
  ros: ros,
  name: '/turtle1/pose',
  messageType: 'turtlesim/Pose'
  // messageType : 'std_msgs/String'
});

var msg = new Promise(function (resolve, reject) {
  setInterval(listener.subscribe(function (message) {
    msg = 'Received message on ' + listener.name + ': ' + JSON.stringify(message)

  }), 1000);
});


class Monitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: "None",
      topics: "None",
      topicstype: "None",
      services: "None",
      publishing: "None",
      subscribing: "None",
      param_node: "/turtlesim_node",
      _nodes: "None"
    }
  }

  componentDidMount() {
    console.log(JSON.stringify(ros.getTopics()), "types")
    console.log(msg, "10000000")
    
    this.interval = setInterval(() => this.setState({
      params: ros.getParams(),
      topics: ros.getTopics(),
      topicstype: ros.getTopics(),
      services: ros.getServices(),
    }), 1000);
    // ros.getNodes(function (nodes) {
    //   this.setState({_nodes: nodes})
    //   console.log(nodes, "nodes");
    //   for (let index = 0; index < nodes.length; index++) {
    //     this["element" + index] = nodes[index];
    //   }
    //   return nodes
    
    // })

  }

  handleChange = (event) => {
    console.log(this.state.param_node, "change")
    this.setState({ param_node: event.target.value });
  }

  handlenodebtn = () => {
    console.log(this.state.param_node, "submit")
    var param_node_var = this.state.param_node[0].value
    ros.getNodeDetails(param_node_var, function (details) {
      this.setState({
        publishing: details.publishing,
        subscribing: details.subscribing,
      });
    });
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    return (

      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h3>List of active nodes: </h3>
          <div id="nodelist"></div>
          <p className={style.active_nodes} id="nodes"></p>

          <p>Enter the name of your node, then click "Submit":</p>
          <form id="frml" onSubmit={this.handlenodebtn}>
            <label>
              Node Name:
          <input type="text" placeholder="/turtlesim_node" value={this.state.param_node} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <p id="nodenamehtml" className={style.node}>{this.state.param_node}</p>

          <h3>Rostopics: </h3>
          <div>Publishing: </div>
          <p id="publishing" className={style.node}>{this.state.publishing}</p>
          <div>Subscribing: </div>
          <p id="subscribing" className={style.node}>{this.state.subscribing}</p>
          <hr />

          <h3>List of active params: </h3>
          <button onClick={this.handleparams}> "Toggle Show/Hide"</button>
          <input className="btn btn-primary" type="submit" value="Toggle Show/Hide" onClick={this.handleparams} />
          <p className={style.activetabs} id="params">{this.state.params}</p>

          <h3>List of active topics: </h3>
          <input className="btn btn-primary" type="submit" value="Toggle Show/Hide" onClick={this.handletopics} />
          <p className={style.activetabs} id="topics">{this.state.topics}</p>

          <h3>List of active topic types: </h3>
          <input className="btn btn-primary" type="submit" value="Toggle Show/Hide" onClick={this.handletopictype} />
          <p className={style.activetabs} id="topictype">{this.state.topictype}</p>

          <h3>List of active services: </h3>
          <input className="btn btn-primary" type="submit" value="Toggle Show/Hide" onClick={this.handleservices} />
          <p className={style.activetabs} id="services">{this.state.services}</p>
        </div>
      </div>


    )
  }
};

export default Monitor