import global from "../../global";

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onButtonClick(event ,customData){
        switch (customData){
            case 'close':
                console.log("关闭房间");
                this.node.destroy();
                break;
            case 'create':
                console.log('创建房间');
                global.socket.createRoom(customData,function (err, data) {
                    if (err){
                        console.log("createRoom err =" + err);
                    }else {
                        console.log("createRoom.js createRoom data =" + JSON.stringify(data));
                        cc.director.loadScene('gameScenes');
                    }
                });
                break;

            default:
                break;
        }
        console.log("customData "+ customData);

    }

});
