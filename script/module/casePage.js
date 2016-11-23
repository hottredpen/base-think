require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'bdshare'         : "http://bdimg.share.baidu.com/static/api/js/share"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_bdshare','common','commonTool','uploadify','./unit_tools/banner'],function($,CPK_bdshare){

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    $(document).ready(function(){
        require(["chat"]);
        $("#bussiness_scroll").cxScroll();

        //幻灯片
        $('.ck-slide').ckSlide({
            autoPlay: true
        });

    });
});
