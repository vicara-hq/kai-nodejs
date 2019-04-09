import * as WebSocket from 'ws';
import KaiEventEmitter from './KaiEventEmitter';
import * as sdk from './sdk'
let ws = new WebSocket('ws://localhost:2203');

export let kaiEvents = new KaiEventEmitter();

ws.on('message',function(data){
    let response:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)));
    console.log(response);
    if(response['success']){
        switch(response['type']){
            case 'authentication':
                kaiEvents.emit('authentication','auth done emitter')      
                break;
            default:
                kaiEvents.emit('wrong','wrong')
        };
    }else{
        kaiEvents.emit(response.type,response)
    }
});

export function auth(moduleId:string,moduleSecret:string){
    let authToken:sdk.AuthenticationRequest={
        type:'authentication',
        moduleId:moduleId,
        moduleSecret:moduleSecret
    };

    ws.on('open',function(){
        ws.send(JSON.stringify(authToken))
    });
};
