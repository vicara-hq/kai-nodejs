import * as WebSocket from 'ws';
import { stringify } from 'querystring';
import * as sdk from './sdk';
import { print } from 'util';
import { type } from 'os';
import { resolve } from 'path';
import { rejects } from 'assert';
import * as Promise from 'bluebird';
let ws:WebSocket;
var isConnected:boolean = false
var isAuthenticated:boolean = false


connect('123','qwerty')

//connect and authenticate
function connect(moduleID:string,moduleSecret:string){
	ws = new WebSocket('ws://localhost:2203')
	var authToken:sdk.Request = {
		type:'authentication',
		moduleId:moduleID,
		moduleSecret:moduleSecret
	}
	
	ws.on('open',()=>{
		ws.send(JSON.stringify(authToken,null,'\t'))
		
	})
	recieve().then((message)=>{
		console.log(message)
	}).catch((error)=>{
		console.log(error)
	}).catch((errorMessage)=>{
		console.log(errorMessage)
	})		
}

//Capabilities

// function setCapabilities(kaiId){
// 	var capabilityRequest:sdk.Request
// 	capabilityRequest.type='setCapabilities'
// 	capabilityRequest.kaiId = kaiId
// 	capabilityRequest.
// }

//Recieve : 

function recieve(){
	return new Promise((resolve,reject)=>{
		ws.on('message',(data)=>{
			var res:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)))
			
			if (res['type']=='authentication' && res["success"]){
				resolve('Auth Success')
			}else{
				reject(res['error'])
			}
		})
	})
}
