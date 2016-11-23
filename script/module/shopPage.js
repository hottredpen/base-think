require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'qrcode'    : ['jquery'],
        'cloudzoom' : ['jquery'],
        'raty'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'qrcode'          : "../../static/cpk/plugins/qrcode/jquery.qrcode.min",
        'cloudzoom'       : "../../cpkbuild/module/lib/cloud-zoom-cf7ec91c76",
        'raty'            : "../../static/cpk/plugins/raty/jquery.raty",
        'bdshare'         : "http://bdimg.share.baidu.com/static/api/js/share"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_bdshare','./cpk_tools/cpk_store_seephone','./cpk_tools/cpk_store_side','./cpk_tools/cpk_store_navfix','common','commonTool','uploadify'],function($,CPK_bdshare,CPK_store_seephone,CPK_store_side,CPK_store_navfix){
    
    var o_document = $(document);

    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _store_seephone = CPK_store_seephone.createObj();
    _store_seephone.init();

    var _store_side = CPK_store_side.createObj();
    _store_side.init();

    var _store_navfix = CPK_store_navfix.createObj();
    _store_navfix.init();

    $(".shop_right_box").show();

    if($(".cloud-zoom").length>0 || $(".cloud-zoom-gallery").length>0){
        require(["cloudzoom"],function(){
            $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
        });
    }

    //幻灯片
    if($('.ck-slide').length>0){
        require(["./unit_tools/banner"],function(){
            $('.ck-slide').ckSlide({
                autoPlay: true
            });
        });
    }
    if($('.commentStar').length>0){
        require(["raty"],function(){
            $('.commentStar').raty({
                path      : '/static/cpk/plugins/raty/images',
                half      : false,
                starHalf  : 'star-half.png',
                starOff   : 'star-off.png',
                starOn    : 'star-on.png',
                readOnly  : true,
                score: function() {
                    return $(this).attr('data-score');
                }
            });
        });
    }

    $(document).ready(function(){
        require(["chat"]);
    });


    $(".u-service-tab").click(function(){
        var o_this  = $(this);
        var showDiv = o_this.attr("data-showdiv");
        var needload = o_this.attr("data-needload");
        $(".u-service-tab").removeClass("cur");
        $(".ser-int-cont").hide();
        $(this).addClass("cur");
        $(showDiv).show();
    });


    o_document.on("click",".J_buy_chuangpin",function(){
        var chuangpinid = $(this).attr("rel");
        $.ajax({
            url :  "/api/users/buychuangpin",
            type : 'post',
            cache : false,
            dataType :'json',
            data : {chuangpinid:chuangpinid},
            success:function(res) {
                if(res.status==1){
                    location.href = res.data;
                }else if(res.status==-1){
                    showLoginForm();
                }else{
                    $.cpk_alert(res.msg);
                }
            },
            error : function() {}
        });
    });
});