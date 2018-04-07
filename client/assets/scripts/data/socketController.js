import defind from "./../define"
import EventListener from './../uitlity/eventListener'
const SocketController = function () {
    let that = {};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1 ;
    let _event = EventListener({});
    that.init = function () {
        _socket = io(defind.serverURL);
        //接收服务器发来的“notify”通知
        _socket.on("notify",function (data) {
            console.log("socketController.js notify data = " + JSON.stringify(data));
            let msg = data.msg;
            _event.fire(msg,data.data);
            let cb = _callBackMap[data.callBackIndex];
            if(cb){
                cb(null,data.data);
            }
        });
    };
    //没有回调函数的封装
    const notify = function (msg,data) {
        _socket.emit("notify",{msg:msg,callBackIndex:_callBackIndex,data:data})
        _callBackIndex++;
    };
    //有回调函数的封装
    const request = function (msg,data,cb) {
        _callBackMap[_callBackIndex] = cb;
        notify(msg,data);
    };

    /*一下是全局的一些方法*/
    that.login = function (uniqueID,nickName,avatarURL,cb) {
        console.log(uniqueID);
        request("login",{
                uniqueID:uniqueID,
                nickName:nickName,
                avatarURL:avatarURL,},cb);
    };

    that.createRoom = function (data , cb) {
        console.log("socketController.js createRoom data = "+data);
        request("create_Room",data,cb);
    };
    return that;
};

export default SocketController;