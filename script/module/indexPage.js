require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'indexjs'   : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'indexjs'         : "../../static/cpk/module/index/js/new_index"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','common','commonTool','uploadify','./unit_tools/indexbanner','indexjs'],function($){

    onIndexSignupBtn();
    somethingTab();
    //changesignupstatus();

    $(document).ready(function(){
        _initBanner();
        require(["chat"]);
    });

    function onIndexSignupBtn(){
        $(".J_sign").on('click',function(){
            var thisbtn = $(this);
            $.ajax({
                url : "/user/sign",
                type: 'POST',
                dataType: 'json',
                success : function(result){
                    if(result.status == 1){
                        thisbtn.text("已签到");
                        thisbtn.removeClass("J_sign");
                        $.cpk_alert_info("每日签到信息:",result.msg);
                    }
                    if(result.status == 2){
                        $.cpk_alert(result.msg);
                    }
                    if(result.status == -1){
                        showLoginForm();
                    }
                }
            });
        });
    }
    function _initBanner(){
        $('.fullwidthbanner').revolution({
            delay:9000,
            startheight:450,
            startwidth:1120,

            hideThumbs:200,

            thumbWidth:100,                         // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
            thumbHeight:50,
            thumbAmount:5,

            navigationType:"bullet",                    //bullet, thumb, none, both     (No Thumbs In FullWidth Version !)
            navigationArrows:"verticalcentered",        //nexttobullets, verticalcentered, none
            navigationStyle:"round",                //round,square,navbar

            touchenabled:"on",                      // Enable Swipe Function : on/off
            onHoverStop:"on",                       // Stop Banner Timet at Hover on Slide on/off

            navOffsetHorizontal:0,
            navOffsetVertical:0,

            stopAtSlide:-1,
            stopAfterLoops:-1,

            shadow:0,                               //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
            fullWidth:"on"                          // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
        });

    }

    function somethingTab(){
        $(".box_header li").mouseover(function() {
            $(this).addClass("select").siblings().removeClass("select");
            $(".box_detail").eq($(".box_header li").index(this)).show().siblings(".box_detail").hide();
        });
        $(".hire_tab li").click(function() {
            $(this).addClass("current").siblings().removeClass("current");
            $(".hire_cont").eq($(".hire_tab li").index(this)).show().siblings(".hire_cont").hide();
        });
        $(".tablecorll a").mouseover(function() {
            $(this).addClass("on").siblings().removeClass("on");
            $(".tablelicx").eq($(".tablecorll a").index(this)).show().siblings(".tablelicx").hide();
        });

        $(".hz_tab a").mouseover(function() {
            $(this).addClass("current").siblings().removeClass("current");
            $(".tjdp").eq($(".hz_tab a").index(this)).show().siblings(".tjdp").hide();
        });
        $(".cy_tab a").mouseover(function() {
            $(this).addClass("current").siblings().removeClass("current");
            $(".modify_cyjs").eq($(".cy_tab a").index(this)).show().siblings(".modify_cyjs").hide();
        });

        $(".friend_tab li").mouseover(function() {
            $(this).addClass("current").siblings().removeClass("current");
            $(".frieng_nav").eq($(".friend_tab li").index(this)).show().siblings(".frieng_nav").hide();
        });

        $(".jy_tab li").click(function() {
            $(this).addClass("current").siblings().removeClass("current");
            $(".jy_cont").eq($(".jy_tab li").index(this)).show().siblings(".jy_cont").hide();
        });

        //推荐任务
        $(".tjrw_tab li").live('click', function() {
            $(this).addClass("current").siblings().removeClass("current");
            var catid = $(this).attr('rel');
            if($('#tjrw_cont'+catid).length > 0){
                $('.tjrw_cont').hide();
                $('#tjrw_cont'+catid).show();
            } else {

            }
            // $(".tjrw_cont").eq($(".tjrw_tab li").index(this)).show().siblings(".tjrw_cont").hide();
        });
    }

});
