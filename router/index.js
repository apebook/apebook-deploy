var hook = require('../controller/hook');
module.exports = function(app){
    //同步assets代码到服务器
    app.post('/hook/assets',hook.assets);
    //同步 app 代码，并重启应用
    app.get('/hook/app',hook.app);
};