import { WechatyPlugin, Room, Contact } from "wechaty";
export interface GotKickOptions {
    onKick(room: Room, remover: Contact | undefined, date: Date | undefined): void;
}
export declare const defaultOptions: GotKickOptions;
export interface I_RoomLeaveObj {
    room: Room;
    leaveList: Contact[];
    remover: Contact | undefined;
    date: Date | undefined;
}
export declare function onRoomLeaving(options: GotKickOptions, roomLeaveObj: I_RoomLeaveObj): boolean;
export declare function GotKick(options: GotKickOptions): WechatyPlugin;
//# sourceMappingURL=index.d.ts.map