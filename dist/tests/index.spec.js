"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tstest_1 = require("tstest");
const src_1 = require("../src/");
const wechaty_1 = require("wechaty");
const wechaty_puppet_mock_1 = require("wechaty-puppet-mock");
const sinon_1 = __importDefault(require("sinon"));
async function* wechatyFixtures() {
    const sandbox = sinon_1.default.createSandbox();
    const wechaty = new wechaty_1.Wechaty({ puppet: new wechaty_puppet_mock_1.PuppetMock() });
    await wechaty.start();
    const room = wechaty.Room.load('mock_room_id');
    const leaveList = [wechaty.Contact.load('mock contact001'), wechaty.Contact.load('mock contact002')];
    let remover = wechaty.Contact.load('remover001');
    yield {
        room,
        leaveList,
        remover,
        wechaty,
    };
    sandbox.restore();
    await wechaty.stop();
}
tstest_1.test('integration testing', async (t) => {
    for await (const { wechaty } of wechatyFixtures()) {
        wechaty.use(src_1.GotKick({
            onKick() { }
        }));
        t.ok(wechaty, 'should get a bot');
    }
});
tstest_1.test('got kick', async (t) => {
    for await (const { room, leaveList, remover } of wechatyFixtures()) {
        let leavingObj = {
            date: new Date(),
            leaveList: leaveList,
            remover,
            room
        };
        const gotKickOptions = {
            onKick() {
            }
        };
        const sandbox = sinon_1.default.createSandbox();
        sandbox.stub(leavingObj.leaveList[0], 'self').returns(true);
        let result = src_1.onRoomLeaving(gotKickOptions, leavingObj);
        t.equal(result, true, 'should catch got kick');
    }
});
tstest_1.test('someone else leaving', async (t) => {
    for await (const { room, leaveList, remover } of wechatyFixtures()) {
        let leavingObj = {
            date: new Date(),
            leaveList: leaveList,
            remover,
            room
        };
        const gotKickOptions = {
            onKick() {
            }
        };
        const sandbox = sinon_1.default.createSandbox();
        sandbox.stub(leavingObj.leaveList[0], 'self').returns(false);
        let result = src_1.onRoomLeaving(gotKickOptions, leavingObj);
        t.equal(result, false, 'should catch nothing');
    }
});
//# sourceMappingURL=index.spec.js.map