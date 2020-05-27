import {
   test,
} from 'tstest'

import {
   GotKick,
   onRoomLeaving,
   I_RoomLeaveObj,
   GotKickOptions
} from '../src/'
import {
   Wechaty,
} from 'wechaty'

import {
   PuppetMock,
} from 'wechaty-puppet-mock'
import sinon from 'sinon'
async function* wechatyFixtures() {
   const sandbox = sinon.createSandbox()

   const wechaty = new Wechaty({ puppet: new PuppetMock() })
   await wechaty.start()
   const room = wechaty.Room.load('mock_room_id')
   const leaveList = [wechaty.Contact.load('mock contact001'), wechaty.Contact.load('mock contact002')]
   let remover = wechaty.Contact.load('remover001')

   yield {
      room,
      leaveList,
      remover,
      wechaty,
   }

   sandbox.restore()
   await wechaty.stop()
}
test('integration testing', async (t) => {
   for await (const { wechaty } of wechatyFixtures()) {
      wechaty.use(GotKick({
         onKick() { }
      }))
      t.ok(wechaty, 'should get a bot')
   }
})


test('got kick', async (t) => {
   for await (const { room, leaveList, remover } of wechatyFixtures()) {
      let leavingObj: I_RoomLeaveObj = {
         date: new Date(),
         leaveList: leaveList,
         remover,
         room
      }
      const gotKickOptions: GotKickOptions = {
         onKick() {

         }
      }
      const sandbox = sinon.createSandbox()
      sandbox.stub(leavingObj.leaveList[0], 'self').returns(true)
      let result = onRoomLeaving(gotKickOptions, leavingObj)

      t.equal(result, true, 'should catch got kick')
   }
})

test('someone else leaving', async (t) => {
   for await (const { room, leaveList, remover } of wechatyFixtures()) {
      let leavingObj: I_RoomLeaveObj = {
         date: new Date(),
         leaveList: leaveList,
         remover,
         room
      }
      const gotKickOptions: GotKickOptions = {
         onKick() {

         }
      }
      const sandbox = sinon.createSandbox()
      sandbox.stub(leavingObj.leaveList[0], 'self').returns(false)
      let result = onRoomLeaving(gotKickOptions, leavingObj)
      t.equal(result, false, 'should catch nothing')
   }
})