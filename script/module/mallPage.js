require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'malljs'    : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'malljs'          : "../../static/cpk/module/mall/js/mall"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','common','commonTool','uploadify','malljs'],function($){
    var o_document = $(document);

    $(document).ready(function(){
        require(["chat"]);
    });
});
