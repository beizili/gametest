let playerData = function () {
    let that = {};
    that.uid = undefined;
    that.uniqueID = "10000";
    for (let i = 0; i < 6; i++) {
        that.uniqueID += Math.floor(Math.random() * 10);
    }
    that.nickName = "昵称" + Math.floor(Math.random() * 10);
    that.avatarURL = "http://forum.cocos.com/uploads/default/original/2X/b/b1235a3a3004bf0b0ce6031b1b03bb2c8a4a1609.png";
    that.houseCardCount = 0;

    that.wxLoginSuccess = function (data) {
        that.uniqueID = data.uniqueID;
        that.nickName = data.nickName;
        that.avatarURL = data.avatarURL;
    };

    that.gameLoginSuccess = function (data) {
        that.uid = data.uid;
        that.nickName = data.nickName;
        that.avatarURL = data.avatarURL;
        that.houseCardCount = data.houseCardCount;
    };
    return that;
};

export default playerData