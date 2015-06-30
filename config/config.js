//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "apebook-deploy",
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'public'),
    "root":'/root/www',
    "oss":{
        accessKeyId: 'R7wBScg51UDJv06B',
        accessKeySecret: '8rkUyvVcDbNFOBsxnxRdGGGhg6qyZb',
        bucket: 'apebook',
        region: 'oss-cn-hangzhou'
    },
    "ossBuckets":{
        asset: 'apebook-asset',
        book: 'apebook-book'
    }
};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}

module.exports = config;