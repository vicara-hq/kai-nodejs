import * as WebSocket from 'ws';
import KaiEventEmitter from './KaiEventEmitter';
import * as sdk from './sdk'
import { KaiCapabilities } from "./KaiCapabilities";

let ws = new WebSocket('ws://localhost:2203');
export let kaiEvents = new KaiEventEmitter();
export let kaiCapabilities = KaiCapabilities;


ws.on('message',function(data){
    let response:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)));
    //console.log(response);
    if(response['success']){
        switch(response['type']){
            case 'authentication':
                kaiEvents.emit('authentication','Auth Complete')      
                break;
            case 'setCapabilities':
                kaiEvents.emit('setCapabilities','Capabilities Set')
                break;
            case 'getCapabilities'://WIP
                kaiEvents.emit('getCapabilities',response)
                break;
            case 'fingerCalibration':
                kaiEvents.emit('fingerCalibration',response)
                break;  
            case 'imuCalibration':
                kaiEvents.emit('imuCalibration',response)
                break;
            case 'listConnectedKais':
                kaiEvents.emit('listConnectedKais',response)
                break;    
            case 'getKaiData':
                kaiEvents.emit('getKaiData',response)
                break; 
            case 'switchHand':
                kaiEvents.emit('switchHand',response)
                break;          
              

            default:
                kaiEvents.emit('wrong','wrong')
                break;
        };
    }else{
        kaiEvents.emit(response.type,response.error)
    }
});
export function fingerCalibration(kaiId:number|"default"|"defaultLeft"|"defaultRight"="default"){
    let request:sdk.FingerCalibrationRequest={
        type:'fingerCalibration',
        kaiId:kaiId,
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request));
    });

};

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

export function setCapabilities(kaiId:string|"default"|"defaultLeft"|"defaultRight"){ //capabilities:[string]
    //TODO : check that ws.on('open') send [part']
    let request:sdk.SetCapabilitiesRequest={
        type : 'setCapabilities',
        gestureData:true
    }
    ws.on('open',function(){
        ws.send(JSON.stringify(request));

    });
}
