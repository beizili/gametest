"use strict";
const Player = function (socket , data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarURL = data.avatarURL;
    let _houseCardCount = data.house_card_count;
    let _callBackIndex = data.callBackIndex;
    // 给客户端发通知
    const notify = function (msg,callBackIndex,data) {
        _socket.emit("notify",{msg:msg,callBackIndex:callBackIndex,data:data});
    };
   //给客户端发送"登陆客户的信息"
    notify("login",_callBackIndex,{
        uid:_uid,nickName:_nickName,avatarURL:_avatarURL,houseCardCount:_houseCardCount
    });
    //给客户端发送"创建房间"的信息
    _socket.on("notify",function (res) {
        let msg = res.msg;
        let callBackIndex = res.callBackIndex;
        let data = res.data;
        console.log("player.js msg = "+msg);
        switch (msg){
            case "create_Room":
                console.log("player.js create_Room data = " + data);
                // notify("create_Room",callBackIndex,data);
                break;
            default:
                break;
        }
    });

    return that;
};
let _playerList = [];
exports.createPlayer = function (socket , data) {
    console.log("create player = " + JSON.stringify(data));
    let player = Player(socket,data);
    _playerList.push(player);
};