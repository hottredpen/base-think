require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'datepicker': ['jquery'],
        'kindeditor': ['jquery'],
        'jcrop'     : ['jquery'],
        'ZeroClipboard': ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'datepicker'      : "../../static/cpk/plugins/datepicker/js/bootstrap-datepicker",
        'kindeditor'      : "../../static/js/kindeditor/kindeditor-all",
        'jcrop'           : "../../static/js/jquery.Jcrop.min",
        'ZeroClipboard'   : "../../static/cpk/plugins/zeroClipboard/ZeroClipboard"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_store_weixinqrcode','./cpk_tools/cpk_user_store','./cpk_tools/cpk_user_cases','./cpk_tools/cpk_user_banner','./cpk_tools/cpk_user_kefu','./cpk_tools/cpk_user_team','./cpk_tools/cpk_user_publishgoods','./cpk_tools/cpk_copylink','./cpk_tools/cpk_user_editorderid','./cpk_tools/cpk_user_publishservice','./cpk_tools/cpk_kindeditor','./cpk_tools/cpk_user_storetemplatechange','./cpk_tools/cpk_user_selecthandle','common','commonTool','uploadify','datepicker'],function($,CPK_store_weixinqrcode,CPK_user_store,CPK_user_cases,CPK_user_banner,CPK_user_kefu,CPK_user_team,CPK_user_publishgoods,CPK_copylink,CPK_user_editorderid,CPK_user_publishservice,CPK_kindeditor,CPK_user_storetemplatechange,CPK_user_selecthandle){
    var o_document = $(document);

    var _store_weixinqrcode = CPK_store_weixinqrcode.createObj();
    _store_weixinqrcode.init();

    var _user_store = CPK_user_store.createObj();
    _user_store.init();

    var _user_cases = CPK_user_cases.createObj();
    _user_cases.init();

    var _user_banner = CPK_user_banner.createObj();
    _user_banner.init();

    var _user_kefu = CPK_user_kefu.createObj();
    _user_kefu.init();

    var _user_team = CPK_user_team.createObj();
    _user_team.init();

    var _user_storetemplatechange = CPK_user_storetemplatechange.createObj();
    _user_storetemplatechange.init();

    var _user_publishservice = CPK_user_publishservice.createObj();
    _user_publishservice.init();

    var _user_publishgoods = CPK_user_publishgoods.createObj();
    _user_publishgoods.init();

    var _user_selecthandle = CPK_user_selecthandle.createObj();
    _user_selecthandle.init();

    var _user_editorderid = CPK_user_editorderid.createObj();
    _user_editorderid.init();


    var _copylink = CPK_copylink.createObj();
    _copylink.init();




    kindeditor_init();

    onServiceSearchBtn();
    onGoodsSearchBtn();
    onSellOutGoodsSearchBtn();
    on_CPK_datepicker_select();

    o_document.ready(function(){
        require(["chat"]);
    });

    function kindeditor_init(){
        if($('.j_kindeditor').length>0){
            var textareaID  = $('.j_kindeditor').attr("data-id");
            var _kindeditor = CPK_kindeditor.createObj();
            _kindeditor.init({'textareaID':textareaID});
        }
    }
    function onServiceSearchBtn(){

        o_document.on("click","#J_search_service",function(){
            var serviceid = $('input[name=serviceid]').val();
            var title     = $('input[name=title]').val();
            var pricetype = $('select[name=pricetype]').val();
            var recommend = $('select[name=recommend]').val();
            var close     = $('input[name=close]').val();
            var url = "/user/servicelist/serviceid/"+serviceid+"/title/"+title+"/pricetype/"+pricetype+"/close/"+close+"/recommend/"+recommend;
            $("#searchform").attr("action",url);
            $("#searchform").submit();
        });

    }

    function onGoodsSearchBtn(){
        o_document.on("click","#J_search_goods",function(){
            var od         = $("#od").val();
            var goodsid    = $('input[name=goodsid]').val();
            var goodstitle = $('input[name=goodstitle]').val();
            var close      = $('input[name=close]').val();
            var url = "/user/sourcelist/goodstitle/"+goodstitle+"/goodsid/"+goodsid+"/od/"+od+"/close/"+close;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });
    }

    function onSellOutGoodsSearchBtn(){

        o_document.on("click","#J_sellout_goods_search",function(){
            var od         = $("#od").val();
            var goodsid    = $('input[name=goodsid]').val();
            var goodstitle = $('input[name=goodstitle]').val();
            var start_time = $('input[name=start_time]').val();
            var end_time   = $('input[name=end_time]').val();
            var url = "/user/sellOutSource/start_time/"+start_time+"/end_time/"+end_time+"/goodstitle/"+goodstitle+"/goodsid/"+goodsid+"/od/"+od;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });
    }
    function on_CPK_datepicker_select(){

        $('#j_start_time').datepicker({
            //container : "#detepicker_botton_box",
            autoclose: true,
            format: "yyyy-mm-dd"
        });
        $('#j_end_time').datepicker({
            //container : "#detepicker_botton_box",
            autoclose: true,
            format: "yyyy-mm-dd"
        });
    }



});
