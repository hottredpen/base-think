require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify'   : ['jquery'],
        'chat'        : ['jquery'],
        'kindeditor'  : ['jquery'],
        'fullcalendar': ['jquery','moment'],
        'fc_zh_cn'    : ['jquery','moment','fullcalendar'],
        'datepicker'  : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'fullcalendar'    : "../../static/cpk/plugins/fullcalendar_2_9_0/fullcalendar",
        'moment'          : "../../static/cpk/plugins/fullcalendar_2_9_0/lib/moment.min",
        'fc_zh_cn'        : "../../static/cpk/plugins/fullcalendar_2_9_0/lang/zh-cn",
        'bdshare'         : "http://bdimg.share.baidu.com/static/api/js/share",
        'datepicker'      : "../../static/cpk/plugins/datepicker/js/bootstrap-datepicker"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_monthtaskdetail','./cpk_tools/cpk_uploadify','./cpk_tools/cpk_kindeditor','./cpk_tools/cpk_bdshare','common','commonTool','uploadify'],function($,CPK_monthtaskdetail,CPK_uploadify,CPK_kindeditor,CPK_bdshare){
    var o_document = $(document);

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _uploadify = CPK_uploadify.createObj();
    _uploadify.init({"uploadType": "task_bid","inputFileId":"#retaskfile_upload"});

    var _taskdetail = CPK_monthtaskdetail.createObj();
    _taskdetail.init();

    if($('.j_kindeditor').length>0){
        var textareaID  = $('.j_kindeditor').attr("data-id");
        var _kindeditor = CPK_kindeditor.createObj();
        _kindeditor.init({'textareaID':textareaID});
    }

    o_document.ready(function(){
        require(["chat"]);
    });

    o_document.on("mouseover",".j_on_spandiv_show",function(){
        $(this).addClass("on");
    }).on("mouseleave",".j_on_spandiv_show",function(){
        $(this).removeClass("on");
    });


});
