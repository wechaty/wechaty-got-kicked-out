# Wechaty-Got-Kicked-Out [![Build Status](https://travis-ci.org/JesseWeb/wechaty-got-kicked-out.svg?branch=master)](https://travis-ci.org/JesseWeb/wechaty-got-kicked-out)
## What is this?
this is a wechaty plugin to monitor whether your bot is kicked out of group chat.
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
   }
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


