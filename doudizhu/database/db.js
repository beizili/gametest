'use strict';
const mysql = require("mysql");
let client = undefined;
//数据库执行函数
const query = function (sql, cb) {
    console.log('query=' + sql);
    client.getConnection(function (err, connection) {
        if (err) {
            console.log('connection mysql err' + err);
            cb(err);//将错误传递给下一级函数，再将err抛出
            throw err;
        } else {
            connection.query(sql, function (connerr, result, fileds) {
                if (connerr) {
                    console.log('query err=' + connerr);
                    cb(connerr);
                }
                else {
                    cb(null, result);//数据库操作不发生错误，则将结果返回给下一级函数，此时第一个参数不可放空，必须填写。如果放空，则结果将作为err传递给下一级函数
                }
                connection.release();
            })
        }
    })
}
//数据库连接的操作
exports.connect = function (config) {
    client = mysql.createPool(config);
};
//查找玩家数据
/**
 * 根据uniqueID查询
 * @param uniqueID
 * @param cb
 */
exports.checkPlayer = function (uniqueID, cb) {
    let sql = 'select * from t_playerinfo where unique_id =' + uniqueID + ';';
    query(sql, function (err, data) {
        if (err) {
            console.log('err=' + err);
        }
        console.log('check player =' + JSON.stringify(data));
        cb(err, data);
    })
}
// 插入语句的封装
const insertSql = function (table, data) {
    let sql = 'insert into ' + table + '';
    let valueStr = 'values(';
    let ketStr = '(';
    for (let i in data) {
        ketStr += i + ',';
        if ((typeof data[i]).indexOf('string') === 0) {
            valueStr += "'" + data[i] + "'"+ ',' ;
        } else {
            valueStr += data[i] + ',';
        }
    }
    ketStr = ketStr.substring(0, ketStr.length -1);//切割字符串
    ketStr += ') ';
    valueStr = valueStr.substring(0, valueStr.length - 1);
    valueStr += ') ';
    sql += ketStr + valueStr;
    return sql;
}
//更新语句的封装
const updateSql = function (tabel,mainKey, mainValue, data) {
    let sql = 'update ' + tabel + ' set ';
    for (let i in data){
        if ((typeof data[i]).indexOf('string') === 0){
            sql += i + '=' + "'" + data[i] +"'" + ',';

        }else {
            sql += i + '=' + data[i]  + ',';
        }
    }
    sql = sql.substring(0, sql.length - 1);
    if ((typeof mainValue).indexOf('string') === 0){
        sql += ' where ' + mainKey + '= ' + "'" + mainValue + "'" + ';';

    }else {
        sql += ' where ' + mainKey + '= ' + mainValue + ';';
    }
    return sql;
};
//更新玩家数据
exports.updatePlayerInfo=function (mainKey,mainValue,data) {
    let sql=updateSql('t_playerinfo',mainKey,mainValue,data);
    console.log("updateSql = " + sql)
    query(sql,function (err, res) {
        if(err){
            console.log('update player info err=' + err);
        }else {
            console.log('update player info success=' + JSON.stringify(res));
        }
    })

}
//插入玩家信息
exports.insertPlayerInfo = function (data) {
    let sql = insertSql('t_playerinfo', data);
    console.log('sql=' + sql);
    query(sql, function (err, res) {
        if (err) {
            console.log('insert player into err=' + err);
        } else {
            console.log('res=' + JSON.stringify(res));
        }
    });
}

