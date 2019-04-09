import * as main from "./index";
import KaiEventEmitter from './KaiEventEmitter';


main.auth('0','qwerty')
main.kaiEvents.onauthentication(function(data){
    console.log(data)
})
