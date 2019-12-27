// Empty JS for your own code to be here

// Connecting to ROS
// -----------------

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

// Subscribing to a Topic
// ----------------------

// var listener = new ROSLIB.Topic({
//   ros: ros,
//   name: '/turtle1/pose',
//   messageType: 'turtlesim/Pose'
//   //    messageType : 'std_msgs/String'
// });

// var msg = {}

// listener.subscribe(function (message) {
//   msg = 'Received message on ' + listener.name + ': ' + JSON.stringify(message);
// });

// setInterval(function () {

//   console.log(msg);

// }, 500);


ros.getNodes(function (nodes) {
  
  console.log(nodes, "nodes");
  for (let index = 0; index < nodes.length; index++) {
    this["element" + index] = nodes[index];
  }
  return nodes

})

// Params
ros.getParams(function (params) {

  document.getElementById("params").innerHTML = JSON.stringify(params)

})

// Topics
ros.getTopics(function (topics) {

  topictype = JSON.stringify(topics.topics)

})

// Topic types
ros.getTopics(function (topics) {

  document.getElementById("topictype").innerHTML = JSON.stringify(topics.types)

})
// Services
ros.getServices(function (services) {

  document.getElementById("services").innerHTML = JSON.stringify(services)

})

export function handlenodebtn() {
  var x = document.getElementById("frml");
  document.getElementById("nodenamehtml").innerHTML = x.elements[0].value;


  ros.getNodeDetails(x.elements[0].value, function (details) {
    document.getElementById("publishing").innerHTML = JSON.stringify(details.publishing)
    document.getElementById("subscribing").innerHTML = JSON.stringify(details.subscribing)
  });
}


// p, t, tt, s
export function handleparams() {
  var x = document.getElementById("params");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
export function handletopics() {
  var x = document.getElementById("topics");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
export function handletopictype() {
  var x = document.getElementById("topictype");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
export function handleservices() {
  var x = document.getElementById("services");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}