import * as WebSocket from 'ws';

let ws: WebSocket;

ws.on('open', () => {
	// TODO:
	// Test compartibility
	// Send capabilities
});

ws.on('message', (data) => {
	
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
			return;
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
			return;
		}
		ws.send(json, err => {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

function toCamelCase(data: string) : string {
	return data[0].toLowerCase() + data.substr(1);
};