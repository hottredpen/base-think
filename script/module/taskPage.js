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
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'bdshare'         : "http://bdimg.share.baidu.com/static/api/js/share"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_invoice','./cpk_tools/cpk_rollcontrol','./cpk_tools/cpk_taskdetail','./cpk_tools/cpk_uploadify','./cpk_tools/cpk_kindeditor','./cpk_tools/cpk_tasks_catid_tag','./cpk_tools/cpk_bdshare','./cpk_tools/cpk_tasks_readlog','common','commonTool','uploadify'],function($,CPK_invoice,CPK_rollcontrol,CPK_taskdetail,CPK_uploadify,CPK_kindeditor,CPK_tasks_catid_tag,CPK_bdshare,CPK_tasks_readlog){
    var o_document = $(document);

    var _invoice = CPK_invoice.createObj();
    _invoice.init();

    var _rollcontrol = CPK_rollcontrol.createObj();
    _rollcontrol.init();

    var _tasks_catid_tag = CPK_tasks_catid_tag.createObj();
    _tasks_catid_tag.init();

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _tasks_readlog = CPK_tasks_readlog.createObj();
    _tasks_readlog.init();

    var _uploadify = CPK_uploadify.createObj();
    _uploadify.init({"uploadType": "task_bid","inputFileId":"#retaskfile_upload"});


    var _taskdetail = CPK_taskdetail.createObj();
    _taskdetail.init();

    if($('.j_kindeditor').length>0){
        var textareaID  = $('.j_kindeditor').attr("data-id");
        var _kindeditor = CPK_kindeditor.createObj();
        _kindeditor.init({'textareaID':textareaID});
    }

    o_document.ready(function(){

        require(["chat"]);
    });



    o_document.on("mouseenter",".j-something-need-show",function(){
        $(this).find('div').show();
        $(this).find('i').removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }).on("mouseleave",".j-something-need-show",function(){
        $(this).find('div').hide();
        $(this).find('i').removeClass("fa-chevron-up").addClass("fa-chevron-down");
    });


    o_document.on("mouseover",".j_on_spandiv_show",function(){
        $(this).addClass("on");
    }).on("mouseleave",".j_on_spandiv_show",function(){
        $(this).removeClass("on");
    });


    o_document.on("click",".J_invite_change_page",function(){
        var page = $(this).attr("rel");
        $('.j_invite_page').hide();
        $('.j_invite_page_'+page).show();
        $('#j_invite_cur_page').html(page);

        $('.J_invite_change_page').removeClass('current');
        $(this).addClass('current');
    });

    o_document.on("click",".J_notpost_change_page",function(){
        var page = $(this).attr("rel");
        $('.j_notpost_page').hide();
        $('.j_notpost_page_'+page).show();
        $('#j_notpost_cur_page').html(page);

        $('.J_notpost_change_page').removeClass('current');
        $(this).addClass('current');
    });


});
