import global from "./../global"
cc.Class({
    extends: cc.Component,

    properties:{

     bg_black: {
         default: null,
         type: cc.Sprite
     },

     houseCardCountLabel:{
         default: null,
         type: cc.Label
     },
     nickNameLabel:{
       default:null,
       type:cc.Label
     },

     IDLabel:{
         default:null,
         type:cc.Label
     },

     tipsLabel:{
         default:null,
         type:cc.Node
     },
     joinRoomPrefab:{
         default:null,
         type:cc.Prefab
     },

     createRoomPrefab:{
         default:null,
         type:cc.Prefab
     }
    },

    onLoad: function () {
        this.nickNameLabel.string = global.dataController.playerData.nickName;
        this.IDLabel.string = "ID: " + global.dataController.playerData.uid;
        this.houseCardCountLabel.string = global.dataController.playerData.houseCardCount;
        console.log("global houseCardCount is " + global.dataController.playerData.houseCardCount);
        cc.loader.load(global.dataController.playerData.avatarURL, (err, tex) => {
            if (err) {
                console.log('err = ' + err);
            }
            cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
            let oldWidth = this.bg_black.node.width;
            let oldHeight = this.bg_black.node.height;
            this.bg_black.spriteFrame = new cc.SpriteFrame(tex);
            this.bg_black.node.scale = {
                x: oldWidth / this.bg_black.node.width,
                y: oldHeight / this.bg_black.node.height
            };

        });
    },

    buttonClick(event , customData){
        console.log("customData = " + customData);
        switch (customData){
            case 'wxLogin':
                break;
            case 'joinRoom':
                console.log("joinRoom");
                this.createPrefad(this.joinRoomPrefab);
                break;
            case 'createRoom':
                console.log("createRoom");
                this.createPrefad(this.createRoomPrefab);
                break;
            default:
                console.log("button ");
                break;
        }
    },
    createPrefad(prefad){
        let node = cc.instantiate(prefad);
        node.parent=this.node;
    },

    update(dt) {
        this.tipsLabel.position = cc.p(this.tipsLabel.position.x - 1, this.tipsLabel.position.y);
        if (this.tipsLabel.position.x < -700) {
            this.tipsLabel.position = cc.p(700, this.tipsLabel.position.y);
        }
    }
});
