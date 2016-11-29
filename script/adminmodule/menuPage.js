require.config({
    baseUrl: "/script/adminmodule",//用绝对位置
    shim: {
        'validator'    : ['../../script/lib/validator/dist/jquery.validator']
        // 'validform'    : ['jquery'],
        // 'uploadify' : ['jquery'],
        // 'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/js/jquery",
        'validator'       : '../../script/lib/validator/dist/local/zh-CN',
        //'validform'       : "../../script/lib/validform/js/validform",
        // 'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        // 'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/js/css'
        }
    }
});
define(['jquery','dialog','common','commonTool','validator'],function($,dialog){





});
