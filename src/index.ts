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

function recieve(){
	return new Promise((resolve,reject)=>{
		ws.on('message',(data)=>{
			var res:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)))
			isConnected = res["success"]
			console.log(res)
			if (isConnected && res['type']=='authentication'){
				resolve('Auth Success')
				console.log(res)
			}else{
				reject(res['error'])
		}
	})
})
}
