require.config({
    baseUrl: "/script/adminmodule",//用绝对位置
    shim: {
        // 'uploadify' : ['jquery'],
        // 'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/js/jquery",
        // 'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        // 'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/js/css'
        }
    }
});
define(['jquery','common','commonTool'],function($){
    $(document).ready(function(){
        console.log("yes");
    });
});
