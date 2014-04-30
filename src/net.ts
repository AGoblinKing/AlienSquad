export enum NetPacketType {
    Update
}

export interface NetPacket {
    uuid:String;
    type:NetPacketType;
    payload:any;
}