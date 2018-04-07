'use strict';
const socket = require("socket.io");
const config = require("./dbConfig");
const mysql = require("./database/db");
const playerCreate = require("./game/player");
const app = socket(3000);


mysql.connect(config.mysqlConfig);
app.on("connection" , function (socket) {
    console.log("connection succeed");
    socket.emit("co" , "cocos creator");
    socket.on("notify",function (data) {
        let msg = data.msg;
        let res = data.data;
        let callBackIndex = data.callBackIndex;
        switch (msg){
            case "login":
                console.log("res as"+JSON.stringify(res));
                mysql.checkPlayer(res.uniqueID,function (err,data) {
                    if (err){
                        console.log("err :"+err);
                    }else{
                        if(data.length===0){
                            //不存在这名玩家
                            console.log("不存在这名玩家")
                            let uid = 1;
                            for (let i = 0;i<7;i++){
                                uid += Math.floor(Math.random()*10);
                            }
                            let houseCardCount=5;
                            mysql.insertPlayerInfo({
                                unique_ID:res.uniqueID,
                                uid:uid,
                                nick_Name:res.nickName,
                                avatar_URL:res.avatarURL,
                                house_card_count:houseCardCount
                            });
                            playerCreate.createPlayer(socket,{
                                uid:uid,
                                nickName:res.nickName,
                                avatarURL:res.avatarURL,
                                house_card_count:houseCardCount,
                                callBackIndex:callBackIndex
                            })

                        }else {
                            //存在这名玩家,更新玩家信息
                            console.log("存在这名玩家 data = "+ JSON.stringify(data))
                            mysql.updatePlayerInfo("unique_id",res.uniqueID,{
                                nick_Name:res.nickName,
                                avatar_URL:res.avatarURL
                            });
                            playerCreate.createPlayer(socket,{
                                uid:res.uid,
                                nickName:res.nickName,
                                avatarURL:res.avatarURL,
                                house_card_count:res.house_card_count,
                                callBackIndex:callBackIndex
                            })
                        }
                    }
                });
                break;
            default:
                break;
        }

    });

});

console.log("connection to 3000");