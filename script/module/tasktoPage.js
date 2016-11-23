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
define(['jquery','./cpk_tools/cpk_user_needchkphone','./cpk_tools/cpk_user_taskto','common','commonTool','uploadify'],function($,CPK_user_needchkphone,CPK_user_taskto){
    var o_document = $(document);

    o_document.ready(function(){

        var _user_taskto = CPK_user_taskto.createObj();
        _user_taskto.init();

        var _user_needchkphone = CPK_user_needchkphone.createObj();
        _user_needchkphone.init(_user_taskto.modifyPhone);

        require(["chat"]);
    });

    o_document.on("click","#J_monthtasktobtn",function(){
        var isopen =$(this).attr("data-isopen");
        if(isopen==1){
            window.location.href = $(this).attr('data-url');
        }else if(isopen==2){
            $.cpk_alert("对方当前包月数量已达上限");
        }else{
            $.cpk_alert("对方未开启包月服务");
        }
    });

});
