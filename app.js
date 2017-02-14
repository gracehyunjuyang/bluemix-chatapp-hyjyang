/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// http 에서 express app 과 socket.io 동시 사용
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
io.on('connection', function(socket) {
    // 채팅 사용자가 P 로 메시지를 보내면 모든 사용자에게 전송
    socket.on('P', function(msg) {
        io.emit('P', msg);
    });
});
 
// start server on the specified port and binding host
http.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
