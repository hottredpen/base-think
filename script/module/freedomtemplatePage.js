require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'kindeditor': ['jquery'],
        'bigColorPicker' : ['jquery'],
        'qrcode'    : ['jquery'],
        'cloudzoom' : ['jquery'],
        'raty'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'bigColorPicker'  : "../../static/cpk/plugins/bigColorPicker/js/bigColorPicker",
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
define(['jquery','./cpk_tools/cpk_bdshare','./cpk_tools/cpk_user_storetemplatechange','./cpk_tools/cpk_store_seephone','./cpk_tools/cpk_store_side','./cpk_tools/cpk_store_navfix','./cpk_tools/cpk_user_freedom','./cpk_tools/cpk_imgbox_upload','./cpk_tools/cpk_colorpicker','common','commonTool','uploadify','./unit_tools/banner'],function($,CPK_bdshare,CPK_user_storetemplatechange,CPK_store_seephone,CPK_store_side,CPK_store_navfix,CPK_user_freedom,CPK_imgbox_upload,CPK_colorpicker){
    
    var _bdshare = CPK_bdshare.createObj();
    _bdshare.init();

    var _user_storetemplatechange = CPK_user_storetemplatechange.createObj();
    _user_storetemplatechange.init();

    var _store_seephone = CPK_store_seephone.createObj();
    _store_seephone.init();

    var _store_side = CPK_store_side.createObj();
    _store_side.init();

    var _store_navfix = CPK_store_navfix.createObj();
    _store_navfix.init();

    var _colorpicker = CPK_colorpicker.createObj();
    _colorpicker.init();

    var _user_freedom = CPK_user_freedom.createObj();
    _user_freedom.init();

    _init_imglist();//火狐中input内的值刷新后仍然存在
    showBodyImg();

    //隐藏右侧
    $(".shop_right_box").hide();

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




    function _init_imglist(){
        var bodybgimg  = $("input[name=bodybgimg]").val();
        $("#bodybgimgBox img").attr("src",bodybgimg);
    }

    function showBodyImg(){
        var templateBodyUploadImg = CPK_imgbox_upload.createObj();
        templateBodyUploadImg.initUploadImg({
            "modulename" : "bodybgimg",
            "typename"   : "bodybgimg",
            "inputname"  : "bodybgimg",
            "changeEle"  : "bodybg",
            "fileUploadId" : "#body_file_upload",
            "width"      : 100,
            "height"     : 100,
            "maxwidth"   : 100,
            "maxheight"  : 100
        });
        templateBodyUploadImg.triggerBgimgrepeat();
    }


});
