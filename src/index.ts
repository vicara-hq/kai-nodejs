import * as WebSocket from 'ws';
import { stringify } from 'querystring';
import * as sdk from './sdk';
import { print } from 'util';
import { type } from 'os';
import { resolve } from 'path';
import { rejects } from 'assert';
import * as Promise from 'bluebird';

//let ws:WebSocket;
let ws = new WebSocket('ws://localhost:2203')
let gestureList = sdk.gestureList


//Connect and Authenticate
export function connect(moduleID:string,moduleSecret:string){
	return new Promise((resolve,reject)=>{
		var authToken:sdk.Request={
			type:'authentication'
		}
		authToken.moduleId = moduleID
		authToken.moduleSecret = moduleSecret
		ws.on('open',()=>{
			ws.send(JSON.stringify(authToken,null,'\t'))
		})
		recieve().then((message:string)=>{
			resolve(message)
		}).catch((error:string)=>{
			reject(error)
		})
	})
}

//Get Capabilities : has some errors
export function getCapabilities(kaiId:number|"default"|"defaultLeft"|"defaultRight"='default'){
	let getCapabilitiesRequest:sdk.Request={
		'type':'getCapabilities',
		'kaiId':kaiId
	}
		return new Promise((resolve,reject)=>{
		ws.on('open',()=>{
			ws.send(JSON.stringify(getCapabilitiesRequest,null,'\t'))
		})
		recieve().then((message)=>{
			resolve(message)
		}).catch((error)=>{
			reject(error)
		})
	})
	
}	



//Set Capabilities
export function setCapabilities(kaiId:Number | 'default' | 'defaultLeft' | 'defaultRight',gestureData=false,pyrData=false,fingerShortcutData=false,linearFlickData=false,fingerPositionData=false,quaternionData=false,accelerometerData=false,gyroscopeData=false,magnetometerData=false){
	var capabilitySet:sdk.SetCapabilitiesRequest = {
		type: 'setCapabilities',
		kaiId:kaiId
	}
	capabilitySet.gestureData = gestureData
	capabilitySet.pyrData = pyrData
	capabilitySet.fingerShortcutData = fingerShortcutData
	capabilitySet.linearFlickData = linearFlickData
	capabilitySet.fingerPositionData=fingerPositionData
	capabilitySet.quaternionData = quaternionData
	capabilitySet.accelerometerData=accelerometerData
	capabilitySet.gyroscopeData = gyroscopeData
	capabilitySet.magnetometerData = magnetometerData	

	return new Promise((resolve,reject)=>{
		ws.on('open',()=>{
			ws.send(JSON.stringify(capabilitySet,null,'\t'))
		})
		recieve().then((message)=>{
			console.log('message')
			resolve(message)
		}).catch((error)=>{
			console.log(error)
			reject(error)
		})
	})
}	


//Recieve : 
function recieve(){
	return new Promise((resolve,reject)=>{
		ws.on('message',(data)=>{

			var res:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)))
			if (res['type']=='authentication' && res["success"]==true){
				resolve('Auth Success')
			}
			if (res["success"]&&res['type']=='getCapabilities'){
				resolve('Capabilities Recieved')
			}
			if (res['success']&&res['type']=='setCapabilities'){
				resolve('Capability Set Sucessfully')
			}
			else{
				reject(res['error'])
			}
		})
	})
}

//Get Gesture List returns a object
export function getGestureList(){
	return JSON.parse(JSON.stringify(gestureList))
}


//res not updating