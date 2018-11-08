import * as WebSocket from 'ws';
import KaiEventEmitter from './KaiEventEmitter';

let ws: WebSocket;

ws.on('open', () => {
	// TODO:
	// Test compartibility
	// Send capabilities
});

ws.on('message', (data) => {
	var input = JSON.parse(data.toString());
	KaiEvents.emit('data', input);

	if(input.success != true) {
		KaiEvents.emit('error', {
			errorCode: input.errorCode,
			error: input.error,
			message: input.message
		});
		return;
	}

	switch(input.type) {
		case "gestureData":
			KaiEvents.emit('gestureData', input.gesture);
			break;
		// TODO other types of data
	}
});

export function connect() {
	ws = new WebSocket('ws://localhost:2203');
}

export function subscribe(...capabilities: KaiCapabilities[]) {
	return new Promise((resolve, reject) => {
		let json: any = {
			type: 'setCapabilities'
		};
		capabilities.forEach(capability => {
			json[toCamelCase(capability)] = true;
		});
		if(ws) {
			resolve();
		}
		ws.send(json, err => {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

export function unsubscribe(...capabilities: KaiCapabilities[]) {
	return new Promise((resolve, reject) => {
		let json: any = {
			type: 'setCapabilities'
		};
		capabilities.forEach(capability => {
			json[toCamelCase(capability)] = false;
		});
		if(!ws) {
			resolve();
		}
		ws.send(json, err => {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

export const KaiEvents = new KaiEventEmitter();

function toCamelCase(data: string) : string {
	return data[0].toLowerCase() + data.substr(1);
};