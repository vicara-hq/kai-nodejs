import { EventEmitter } from "events";

export default class KaiEventEmitter extends EventEmitter {
    onGesture(handler: any) {
        this.addListener('gestureData',handler);
    }

    onAuthentication(handler: any) {
        this.addListener('authentication', handler);
    }

    onConnect(handler: any) {
        this.addListener('wrong',handler);
    }
    onSetCapabilities(handler:any){
        this.addListener('setCapabilities',handler);
    }
    onFingerCalibration(handler:any){
        this.addListener('fingerCalibration',handler)
    }
    
}