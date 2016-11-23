require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','common','commonTool','uploadify'],function($){

    $(".b_right_info_task_tab li").click(function() {
        $(".b_right_info_task_tab li").removeClass("cur");
        $(this).addClass("cur");
        $(".b_right_info_task_text").hide();
        $(".b_right_info_task_text").eq($(".b_right_info_task_tab li").index(this)).show();
    });


    
    $(document).ready(function(){
        require(["chat"]);
    });
});
