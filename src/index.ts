import * as WebSocket from 'ws';
import { open } from 'inspector';


const ws = new WebSocket('ws://localhost:2203')

//open a new web socket :
function open(){

	ws.on('open',function incoming(data){
		console.log(data)
	})
}

