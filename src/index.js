"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var Promise = require("bluebird");
var ws;
var isConnected = false;
var isAuthenticated = false;
connect('123', 'qwerty');
//connect and authenticate
function connect(moduleID, moduleSecret) {
    ws = new WebSocket('ws://localhost:2203');
    var authToken = {
        type: 'authentication',
        moduleId: moduleID,
        moduleSecret: moduleSecret
    };
    ws.on('open', function () {
        ws.send(JSON.stringify(authToken, null, '\t'));
    });
    recieve().then(function (message) {
        console.log(message);
    })["catch"](function (error) {
        console.log(error);
    })["catch"](function (errorMessage) {
        console.log(errorMessage);
    });
}
function recieve() {
    return new Promise(function (resolve, reject) {
        ws.on('message', function (data) {
            var res = JSON.parse(JSON.parse(JSON.stringify(data)));
            isConnected = res["success"];
            console.log(res);
            if (isConnected && res['type'] == 'authentication') {
                resolve('Auth Success');
                console.log(res);
            }
            else {
                reject(res['error']);
            }
        });
    });
}
