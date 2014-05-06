define(["require", "exports"], function(require, exports) {
    (function (NetPacketType) {
        NetPacketType[NetPacketType["Update"] = 0] = "Update";
    })(exports.NetPacketType || (exports.NetPacketType = {}));
    var NetPacketType = exports.NetPacketType;
});
