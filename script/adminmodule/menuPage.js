require.config({
    baseUrl: "/script/adminmodule",//用绝对位置
    shim: {
        //'artdialog'    : ['jquery']
        // 'uploadify' : ['jquery'],
        // 'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/js/jquery",
        //'artdialog'       : "../../static/artdialog/js/dialog",
        // 'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        // 'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/js/css'
        }
    }
});
define(['jquery','dialog','common','commonTool'],function($,dialog){





});
