import * as main from './index'

main.connect('123','qwerty').then((message)=>{
    console.log(message)
}).catch((error)=>{
    console.log(error)
})


var list = (main.getGestureList())
