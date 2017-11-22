var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
var DB_URL = "mongodb://localhost:27017/music";

/*
var find = require('./public/javascripts/find.js');
var index = require('./routes/index');
var users = require('./routes/users');
*/
var app = express();
app.use(express.static(path.join(__dirname, 'music')));

function selectDate(db,callback){
    //连接到表
    var collection = db.collection('music');
    //查询数据
    collection.find(function(error, cursor){
        var musics=[];
        cursor.each(function(error,doc){
            if(doc){
                musics.push(doc);
            }
        });

        app.get('/all', function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            //find.findByConditions();
            res.send(musics);

        });
    })
};
MongoClient.connect(DB_URL, function(error, db){
    console.log('连接到数据库!');
    selectDate(db,function(result){
        //console.log(result);
        var musics=selectDate();
        db.close();
    })
});




app.listen(8081,"127.0.0.1",function () {
    console.log("open")
});
// module.exports = app;
