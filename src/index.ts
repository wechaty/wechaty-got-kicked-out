import { WechatyPlugin, log, Wechaty, Room, Contact } from "wechaty";

export interface GotKickOptions {
   onKick(room: Room, remover: Contact | undefined, date: Date | undefined): void,
   // whiltList?: I_WhiltList
}
// export interface I_WhiltList {
//    id: string | string[],
//    topic: string | string[]
// }
export const defaultOptions: GotKickOptions = {
   async onKick(room, remover) {
      log.info(`bot just got kick out of [${await room.topic()}]${room.id} by ${remover?.name() || 'it self'}`)
   }
}

export interface I_RoomLeaveObj {
   room: Room,
   leaveList: Contact[],
   remover: Contact | undefined,
   date: Date | undefined
}

export function onRoomLeaving(options: GotKickOptions, roomLeaveObj: I_RoomLeaveObj): boolean {
   let isSelf = false
   const { room, leaveList, remover, date } = roomLeaveObj
   leaveList.forEach((contact: Contact) => {
      if (contact.self()) {
         isSelf = true
         return
      }
   });
   if (isSelf) {
      options.onKick && options.onKick(room, remover, date)
      return true
   } else {
      return false
   }
}

export function GotKick(options: GotKickOptions): WechatyPlugin {
   options = { ...defaultOptions, ...options }
   log.verbose('WechatyPluginContrib', 'QRCodeTerminal("%s")', JSON.stringify(options))
   return (bot: Wechaty) => {
      bot.on('room-leave', (room, leaveList, remover, date) => {
         onRoomLeaving(options, { room, leaveList, remover, date })
      })
   }

}