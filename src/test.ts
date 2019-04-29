import * as main from "./index";
import KaiEventEmitter from './KaiEventEmitter';
import { KaiCapabilities } from "./KaiCapabilities";

let kaiCapabilities = main.kaiCapabilities

// main.auth('0','qwerty')
// main.kaiEvents.onAuthentication(function(data){
//     console.log(data)
// });

// main.setCapabilities('0')
// main.kaiEvents.onSetCapabilities(function(data){
//     console.log(data)
// });

// main.fingerCalibration()
// main.kaiEvents.onFingerCalibration(function(data){
//     console.log(data)
// });
main.setCapabilities(1,['1','2'])