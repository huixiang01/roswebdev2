// Empty JS for your own code to be here

// Connecting to ROS
// -----------------

// import { ROSLIB } from "roslib";

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

// Publishing a Topic
// ------------------

var cmdVel = new ROSLIB.Topic({
  ros: ros,
  name: '/turtle1/cmd_vel',
  messageType: 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
  linear: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  angular: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
});

/* This function:
- retrieves numeric values from the text boxes
- assigns these values to the appropriate values in the twist message
- publishes the message to the cmd_vel topic.
*/
// function pubMessage() {
//     /**
//     Set the appropriate values on the twist message object according to values in text boxes
//     It seems that turtlesim only uses the x property of the linear object 
//     and the z property of the angular object
//     **/
//     var linearX = 1.0;
//     var angularZ = 1.0;

//     // get values from text input fields. Note for simplicity we are not validating.
//     // linearX = 0 + Number(document.getElementById('linearXText').value);
//     // angularZ = 0 + Number(document.getElementById('angularZText').value);

//     // Set the appropriate values on the message object
//     twist.linear.x = linearX;
//     twist.angular.z = angularZ;

//     // Publish the message 
//     cmdVel.publish(twist);
// }

export function forward() {

  var linearX = 1.0;
  var angularZ = 0.0;

  twist.linear.x = linearX;
  twist.angular.z = angularZ;

  cmdVel.publish(twist);
}

export function backward() {

  var linearX = -1.0;
  var angularZ = 0.0;

  twist.linear.x = linearX;
  twist.angular.z = angularZ;

  cmdVel.publish(twist);
}

export function turnLeft() {

  var linearX = 0.0;
  var angularZ = 1.57079632679;

  twist.linear.x = linearX;
  twist.angular.z = angularZ;

  cmdVel.publish(twist);
}

export function turnRight() {

  var linearX = 0.0;
  var angularZ = -1.57079632679;

  twist.linear.x = linearX;
  twist.angular.z = angularZ;

  cmdVel.publish(twist);
}

// Subscribing to a Topic
// ----------------------

var listener = new ROSLIB.Topic({
  ros: ros,
  name: '/turtle1/pose',
  messageType: 'turtlesim/Pose'
  //    messageType : 'std_msgs/String'
});

var msg = {}

listener.subscribe(function (message) {
  msg = 'Received message on ' + listener.name + ': ' + JSON.stringify(message);
});

setInterval(function () {

  console.log(msg);

}, 500);



// Variables to store parameters  console.log("Backgruond set to red.")

var background_r = new ROSLIB.Param({
  ros: ros,
  name: 'background_r'
});

var background_g = new ROSLIB.Param({
  ros: ros,
  name: 'background_g'
});

var background_b = new ROSLIB.Param({
  ros: ros,
  name: 'background_b'
});

// Functions to set color
export function setRed() {
  background_b.set(0);
  background_g.set(0);
  background_r.set(255);
  clearClient.callService()
  console.log("Background set to red.")
}
export function setGreen() {
  background_b.set(0);
  background_g.set(255);
  background_r.set(0);
  clearClient.callService()
  console.log("Background set to green.")
}
export function setBlue() {
  background_b.set(255);
  background_g.set(0);
  background_r.set(0);
  clearClient.callService()
  console.log("Background set to blue.")
}

// console.log(background_r)

// Getting and setting a param value
// ---------------------------------

// ros.getParams(function(params) {
//   console.log(params);
// });

// var maxVelX = new ROSLIB.Param({
//   ros : ros,
//   name : 'max_vel_y'
// });

// maxVelX.set(0.8);
// maxVelX.get(function(value) {
//   console.log('MAX VAL: ' + value);
// });

///////////////////////////////////////////////////////////
// Basically doing "rosservice call /clear" to refresh the background color.
var clearClient = new ROSLIB.Service({
  ros: ros,
  name: '/clear',
  serviceType: 'std_srvs/Empty'
});


clearClient.callService(function (result) {
  console.log(result);
});
///////////////////////////////////////////////////////////

ros.getNodeDetails('/turtlesim_node', function (details) {
  console.log(details);
});

document.onkeydown = checkKey;

export function checkKey(e) {

  e = e || window.event;

  if (e.keyCode === '38') {
    // up arrow
    forward()
  }
  else if (e.keyCode === '40') {
    // down arrow
    backward()
  }
  else if (e.keyCode === '37') {
    // left arrow
    turnLeft()
  }
  else if (e.keyCode === '39') {
    // right arrow
    turnRight()
  }

}

