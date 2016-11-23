require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'kindeditor': ['jquery'],
        'datepicker'  : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'datepicker'      : "../../static/cpk/plugins/datepicker/js/bootstrap-datepicker"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_user_needchkphone','./cpk_tools/cpk_user_monthtaskto','common','commonTool','uploadify'],function($,CPK_user_needchkphone,CPK_user_monthtaskto){
    var o_document = $(document);

    o_document.ready(function(){

        var _user_monthtaskto = CPK_user_monthtaskto.createObj();
        _user_monthtaskto.init();

        var _user_needchkphone = CPK_user_needchkphone.createObj();
        _user_needchkphone.init(_user_monthtaskto.modifyPhone);

        require(["chat"]);
    });

    o_document.on("click","#J_tasktobtn",function(){
        window.location.href = $(this).attr('data-url');
    });

});
