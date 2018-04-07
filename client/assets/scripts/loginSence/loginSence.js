import global from "../global";


cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad(){
        global.socket.init();
    },

    onButtonClick(event , customData){
        if(customData === "wxLogin"){
            console.log("微信登陆");
            global.socket.login(
                global.dataController.playerData.uniqueID,
                global.dataController.playerData.nickName,
                global.dataController.playerData.avatarURL,
                function (err,data) {
                    if(err){
                        console.log("error");
                    }else {
                        console.log("data is "+JSON.stringify(data));
                        global.dataController.playerData.gameLoginSuccess(data);
                        cc.director.loadScene("mainScenes");
                    }
                });
        }
    }
});
