const Room = require("room");

let _roomList = [];
exports.createRoom = function (data) {
    let roomId = "";
    for (let i = 0 ;i < 6 ;i++){
        roomId += Math.floor(Math.random()*10);
    }
    let room = Room(roomId,data);
    _roomList.push(room);

};