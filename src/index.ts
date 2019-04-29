import * as WebSocket from 'ws';
import KaiEventEmitter from './KaiEventEmitter';
import * as sdk from './sdk'
import { KaiCapabilities } from "./KaiCapabilities";
import { type } from 'os';

let ws = new WebSocket('ws://localhost:2203');
export let kaiEvents = new KaiEventEmitter();
export let kaiCapabilities = KaiCapabilities;


ws.on('message',function(data){
    let response:sdk.Response = JSON.parse(JSON.parse(JSON.stringify(data)));
    //console.log(response);
    if(response['success']){
        switch(response['type']){
            case 'authentication':
                kaiEvents.emit('authentication',response.success)      
                break;
            case 'setCapabilities':
                kaiEvents.emit('setCapabilities','Capabilities Set')
                break;
            case 'getCapabilities':
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
            case 'incomingData':
                kaiEvents.emit('incomingData',response) 
                break;       
            default:
                kaiEvents.emit('default','Invalid response')
                break;
        };
    }else{
        kaiEvents.emit(response.type,response.error)
    }
});

//TODO:-
export function setCapabilities(kaiId:number|"default"|"defaultLeft"|"defaultRight",capabilitiesArr:string[]){ 
        var request:object = {
          type: 'setCapabilities',
          kaiId: kaiId
        }
        var obj = {...request}
        const req = (this.obj as any)
        capabilitiesArr.forEach(element => {
          req[element] = true
        });
        

        ws.on('open',function(){
            ws.send(JSON.stringify(request));
        });
}

//NOTE : getCapbilities isn't working right now
export function getCapabilities(kaiId:number|"default"|"defaultLeft"|"defaultRight"="default"){
    let request:sdk.GetCapabilitiesRequest={
        type:'getCapabilities',
        kaiId: kaiId
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request));
    });
};

export function incomingData(){
    let request={
        type:'incomingData'
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request));
    });
}
export function fingerCalibration(kaiId:number|"default"|"defaultLeft"|"defaultRight"="default"){
    let request:sdk.FingerCalibrationRequest={
        type:'fingerCalibration',
        kaiId:kaiId
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request));
    });
};

export function listConnectedKais(){
    let request:sdk.ListConnectedKaisRequest={
        type:'listConnectedKais'
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request))
    });
};

export function getKaiData(kaiId:number|"default"|"defaultLeft"|"defaultRight"="default"){
    let request:sdk.GetKaiDataRequest = {
        type:'getKaiData',
        kaiId:kaiId
    }   
    ws.on('open',function(){
        ws.send(JSON.stringify(request))
    });    
}

export function switchHand(kaiId:number|"default"|"defaultLeft"|"defaultRight"="default",hand:"left"|"right"="left"){
    let request:sdk.SwitchHandRequest={
        type:'switchHand',
        kai:kaiId,
        hand:hand
    }
    ws.on('open',function(){
        ws.send(JSON.stringify(request))
    });  
}

export function imuCalibration(kaiId:number| "default" | "defaultLeft" | "defaultRight" = "default"){
    let request:sdk.Request = {
        type:'imuCalibration',
        kaiId:kaiId
    };
    ws.on('open',function(){
        ws.send(JSON.stringify(request))
    });
}

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


declare interface ObjectConstructor {
    assign(objects: Object[]): Object;
}