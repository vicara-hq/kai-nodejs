import * as main from './index'
import { Data } from 'ws';
import { print } from 'util';

main.connect('0','qwerty').then((message:string)=>{
    console.log(message)
}).catch((error:string)=>{
    console.log(error)
})

// main.getCapabilities(0).then((message)=>{
//     console.log('resolved '+message)
// }).catch((error)=>{
//     console.log('REJECTED '+error)
// })
main.setCapabilities(0,true)
//  var list = main.getCapabilities(0)

// console.log(list)
