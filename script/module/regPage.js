require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_user_reg','common','commonTool','uploadify'],function($,CPK_user_reg){
    var o_document = $(document);

    var _user_reg = CPK_user_reg.createObj();
    _user_reg.init();

    o_document.ready(function(){
        require(["chat"]);
    });

});
