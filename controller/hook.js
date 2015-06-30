//监听github 的 push 触发代码更新
var oss = require('../helper/oss');
var shell = require('../helper/shell');
var path = require('path');
module.exports = {
    //同步 assets 到 oss
    assets: function*(){
        var body = this.request.body;
        this.logger.hook('[assets sync start]');
        this.logger.hook(body);

        var assetsDir = path.join(this.config.root,'apebook-assets');
        var cmd = 'cd '+assetsDir+' && git pull origin master';

        var syncResult = yield shell.exec(cmd);
        this.logger.hook('[shell output]:');
        this.logger.hook(syncResult);

        var pushResult = yield oss.dir(assetsDir+'/build','.',this.config.ossBuckets.asset);
        this.logger.hook('[push oss]:');
        this.logger.hook(pushResult);
        this.body = {"success":true,files:pushResult};
    },
    //触发应用的部署
    app: function*(){
        var body = this.request.body;
        this.logger.hook('[app sync start ]');
        this.logger.hook(body);
        var dir = path.join(this.config.root,'apebook');
        var cmd = 'cd '+dir+' && git pull origin master';

        var syncResult = yield shell.exec(cmd);
        this.logger.hook('[shell output]:');
        this.logger.hook(syncResult);

        this.logger.hook('[app restart]:');
        var restartResult = yield shell.exec('pm2 restart apebook');
        this.logger.hook(syncResult);
        this.body = {"success":true,restartResult:restartResult,syncResult:syncResult};
    }
};