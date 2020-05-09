"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wechaty_1 = require("wechaty");
exports.defaultOptions = {
    async onKick(room, remover) {
        wechaty_1.log.info(`bot just got kick out of [${await room.topic()}]${room.id} by ${(remover === null || remover === void 0 ? void 0 : remover.name()) || 'it self'}`);
    }
};
function onRoomLeaving(options, roomLeaveObj) {
    let isSelf = false;
    const { room, leaveList, remover, date } = roomLeaveObj;
    leaveList.forEach((contact) => {
        if (contact.self()) {
            isSelf = true;
            return;
        }
    });
    if (isSelf) {
        options.onKick && options.onKick(room, remover, date);
        return true;
    }
    else {
        return false;
    }
}
exports.onRoomLeaving = onRoomLeaving;
function GotKick(options) {
    options = { ...exports.defaultOptions, ...options };
    wechaty_1.log.verbose('WechatyPluginContrib', 'QRCodeTerminal("%s")', JSON.stringify(options));
    return (bot) => {
        bot.on('room-leave', (room, leaveList, remover, date) => {
            onRoomLeaving(options, { room, leaveList, remover, date });
        });
    };
}
exports.GotKick = GotKick;
//# sourceMappingURL=index.js.map