require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'kindeditor': ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_user_needchkphone','./cpk_tools/cpk_user_publish','common','commonTool','uploadify'],function($,CPK_user_needchkphone,CPK_user_publish){

    $(document).ready(function(){

        var _user_publish = CPK_user_publish.createObj();
        _user_publish.init();
        
        var _user_needchkphone = CPK_user_needchkphone.createObj();
        _user_needchkphone.init(_user_publish.modifyPhone);

        require(["chat"]);

    });
});
