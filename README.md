# Wechaty-Got-Kicked-Out

[![Wechaty Plugin Contrib](https://img.shields.io/badge/Wechaty%20Plugin-GotKicked-brightgreen.svg)](https://github.com/wechaty/wechaty-got-kicked-out)
[![Wechaty Plugin Contrib](https://img.shields.io/badge/Wechaty%20Plugin-Directory-brightgreen.svg)](https://github.com/wechaty/wechaty-plugin-contrib#wechaty-plugin-directory)
[![Build Status](https://travis-ci.org/JesseWeb/wechaty-got-kicked-out.svg?branch=master)](https://travis-ci.org/JesseWeb/wechaty-got-kicked-out)


## What is this?
this is a wechaty plugin to monitor whether your bot got kicked out of group chat.


just few line of code to implement this instead fussy judging.

## Usage

```javascript
import {Wechaty} from "wechaty"

import {GotKicked} from "wechaty-got-kicked-out"

const bot = new Wechaty({
   name:"wechaty-got-kicked-out"
})

bot.use(GotKicked({
   onKick(room, remover, date){
      console.log(`
         bot just got kick out of ${await room.topic()}]${room.id} 
         by ${remover ? remove.name(): 'it self'} 
         --date：${date}
         `)
   },
   /*
   comming soon... 
   whiltList:{
      id:"19710388933@chatroom"
      // or
      id:["19710388933@chatroom","98345982793@chatroom"]
      // or
      topic:"微信群001"
      // or
      topic:["微信群001","微信群002"]
   }
   */
   
}))

bot.start()
   .catch(console.error)
```

## Test
```bash
npm run test
```

## Build
```bash
npm run build
```
## Maintainers
* @LegendaryJesse - [LegendaryJesse](https://github.com/JesseWeb)

## Copyright & License

* Code & Docs © 2020-now LegendaryJesse|Wechaty
* Code released under the MIT License
* Docs released under Creative Commons


