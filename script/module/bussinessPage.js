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
define(['jquery','./cpk_tools/cpk_bussiness_tag','./cpk_tools/cpk_bdshare','./cpk_tools/cpk_tasks_readlog','common','commonTool','uploadify'],function($,CPK_bussiness_tag,CPK_bdshare,CPK_tasks_readlog){
    var o_document = $(document);

    var _bussiness_tag = CPK_bussiness_tag.createObj();
    _bussiness_tag.init();

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _tasks_readlog = CPK_tasks_readlog.createObj();
    _tasks_readlog.init();

    o_document.ready(function(){
        require(["chat"]);

        $("#bussiness_scroll").cxScroll();
    });

    o_document.on("mouseenter",".j-something-need-show",function(){
        $(this).find('div').show();
        $(this).find('i').removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }).on("mouseleave",".j-something-need-show",function(){
        $(this).find('div').hide();
        $(this).find('i').removeClass("fa-chevron-up").addClass("fa-chevron-down");
    });



});
