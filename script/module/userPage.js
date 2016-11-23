require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery'],
        'datepicker': ['jquery'],
        'jcrop'     : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all",
        'datepicker'      : "../../static/cpk/plugins/datepicker/js/bootstrap-datepicker",
        'jcrop'           : "../../static/js/jquery.Jcrop.min"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','./cpk_tools/cpk_user_needchkphone','./cpk_tools/cpk_user_needchkemail','./cpk_tools/cpk_user_commententry','./cpk_tools/cpk_user_bank','./cpk_tools/cpk_user_realname','./cpk_tools/cpk_user_ensureopen','./cpk_tools/cpk_user_selecthandle','./cpk_tools/cpk_user_email','./cpk_tools/cpk_user_phone','./cpk_tools/cpk_user_info','./cpk_tools/cpk_user_avatar','./cpk_tools/cpk_user_bind','common','commonTool','uploadify','datepicker'],function($,CPK_user_needchkphone,CPK_user_needchkemail,CPK_user_commententry,CPK_user_bank,CPK_user_realname,CPK_user_ensureopen,CPK_user_selecthandle,CPK_user_email,CPK_user_phone,CPK_user_info,CPK_user_avatar,CPK_user_bind){
    var o_document = $(document);
    var needPhoneSend_box;
    var needEmailSend_box


    $(document).ready(function(){
        require(["chat"]);
    });

    onSideLeftBtn();

    onRetaskSearchBtn();
    onTaskSearchBtn();
    onTaskListPublishBtn();
    onTaskListDelectBtn();
    onBuySourceListDelBtn();
    //onCommentEntryBtn();
    onEmployerDelInviteBtn();
    onDelInvoiceBtn();
    onBuyToolsBtn();
    onFinanceTypeChange();
    onFinanceOrderTypeChange();
    onSureRecharge();
    onSureCashBtn();
    on_CPK_tab_change();
    on_CPK_datepicker_select();
    onCollectSearchBtn();
    onReportSearchBtn();
    onBackMoneySearchBtn();
    onResendMsgBtn();
    onSeeInvoiceBtn();
    onEditInvoiceBtn();
    onInviteSearchBtn();
    onNewWitkeyIndex_bate();

    onPhoneChkBtn();
    onEmailChkBtn();


    var _user_commententry  = CPK_user_commententry.createObj();
    _user_commententry.init();

    var _user_bank  = CPK_user_bank.createObj();
    _user_bank.init();

    var _user_realname  = CPK_user_realname.createObj();
    _user_realname.init();

    var _user_ensureopen  = CPK_user_ensureopen.createObj();
    _user_ensureopen.init();

    var _user_selecthandle = CPK_user_selecthandle.createObj();
    _user_selecthandle.init();

    var _user_email = CPK_user_email.createObj();
    _user_email.init();

    var _user_phone = CPK_user_phone.createObj();
    _user_phone.init();

    var _user_info = CPK_user_info.createObj();
    _user_info.init();

    var _user_avatar = CPK_user_avatar.createObj();
    _user_avatar.init();

    var _user_bind = CPK_user_bind.createObj();
    _user_bind.init();


    function onPhoneChkBtn(){

        o_document.on("cpk_phonebox_bind_ok",function(){
            //console.log("cpk_phonebox_bind_ok");
            window.location.reload();
        });

        o_document.on("click",".J_info_chkphone",function(){
            if(typeof needPhoneSend_box == "undefined"){
                needPhoneSend_box = CPK_user_needchkphone.createObj();
                needPhoneSend_box.init(function(){
                    $("#j_can_close_phone_box").removeClass("hidden");
                });
            }else{
                needPhoneSend_box.openBindPhoneDialog();
            }
        });

    }

    function onEmailChkBtn(){
        o_document.on("click",".J_info_chkemail",function(){
            if(typeof needEmailSend_box == "undefined"){
                needEmailSend_box = CPK_user_needchkemail.createObj();
                needEmailSend_box.init(function(){
                    $("#j_can_close_email_box").removeClass("hidden");
                });
            }else{
                needEmailSend_box.openBindEmailDialog();
            }
        });
    }

    function onNewWitkeyIndex_bate(){
        var $li = $('#tab li');
        var $ul = $('#content ul'); 

        $li.mouseover(function(){
            var $this = $(this);
            var $t = $this.index();
            $li.removeClass();
            $this.addClass('current');
            $ul.css('display','none');
            $ul.eq($t).css('display','block'); 
        })

        $(".u-order-cont tr th").addClass("order-from-th");
        $(".u-order-cont li:eq(0) tr:even").addClass("order-from-tr");
        $(".u-order-cont li:eq(0) tr:odd").css("text-align","center");
        $(".u-order-cont li:eq(1) tr:even").addClass("order-from-tr");
        $(".u-order-cont li:eq(1) tr:odd").css("text-align","center");
        $(".u-order-cont li:eq(2) tr:even").addClass("order-from-tr");
        $(".u-order-cont li:eq(2) tr:odd").css("text-align","center");
        $(".u-order-cont li:eq(3) tr:even").addClass("order-from-tr");
        $(".u-order-cont li:eq(3) tr:odd").css("text-align","center");
        $(".u-order-cont li:eq(4) tr:even").addClass("order-from-tr");
        $(".u-order-cont li:eq(4) tr:odd").css("text-align","center");
    }

    function onSideLeftBtn(){
        $('.member_nav').find('h3').toggle(
            function () {
                $(this).siblings().slideUp();
                $(this).find('em').css('background-image','url("/static/weike/images/member_nav_jia.gif")');
            },
            function () {
                $(this).siblings().slideDown();
                $(this).find('em').css('background-image','url("/static/weike/images/member_nav_jian.gif")');
            }
        );
    }

    function onRetaskSearchBtn(){
        o_document.on("click","#J_ck_ucenter_task_search",function(){
            var taskid    = $('input[name=taskid]').val();
            var tasktitle = $('input[name=tasktitle]').val();
            var zzt       = $("#zzt").val();
            var wm        = $("#wm").val();
            var od        = $("#od").val();
            var type      = $("#typename").val();
            if(taskid==""){taskid=0;}
            var url = "/user/retask/wm/"+wm+"/taskid/"+taskid+"/zzt/"+zzt+"/od/"+od+"/type/"+type;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });
    }

    function onTaskListPublishBtn(){
        o_document.on("click",".J_publishBtn",function(){
            var url = $(this).attr("rel");
            $.cpk_confirm("系统消息", "确定要发布么？", function(result){
                if(result=="ok"){
                    location.href = url;
                }
            });
        });

        var lineLog = $(".vertical-line").children();
        var txt1    = "<i style=' margin-right:6px; color:#333;'>|</i>";    
        $.each(lineLog,function(n,theA) { 
            var aObj = $(theA);
            if(aObj.index()>0){
                aObj.prepend(txt1);
            }
        }); 
    }

    function onTaskListDelectBtn(){

        o_document.on("click",".J_tasklistdel_btn",function(){
            var id = $(this).attr('rel');
            $.cpk_confirm("系统消息", "您确定要删除么？", function(result){
                if(result=="ok"){
                    $.ajax({
                        url : "/user/deltask",
                        type: 'POST',
                        dataType: 'json',
                        data : {id:id},
                        success : function(result){
                           if(result.status == 1){
                                $('.t'+id).remove(); 
                            } else {
                                $.cpk_alert(result.msg);
                            }
                        }
                    });  
                }
            });
        });
    }

    function onTaskSearchBtn(){

        o_document.on("click","#J_gz_ucenter_task_search",function(){
            var taskid    = $('input[name=taskid]').val();
            var tasktitle = $('input[name=tasktitle]').val();
            var zzt       = $("#zzt").val();
            var wm        = $("#wm").val();
            var od        = $("#od").val();
            var type      = $("#typename").val();
            if(taskid==""){taskid=0;}
            var url = "/user/task/wm/"+wm+"/taskid/"+taskid+"/zzt/"+zzt+"/od/"+od+"/type/"+type;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });
    }

    function onBuySourceListDelBtn(){

        o_document.on("click",".J_buysource_del",function(){
            var id = $(this).attr("data-orderid");
            $.cpk_confirm("系统消息", "确定要删除？", function(result){
                if(result=="ok"){
                    $.ajax({
                        url : "/user/del_chuangpin_order",
                        type: 'POST',
                        dataType: 'json',
                        data : {id:id},
                        success : function(result){
                           if(result.status == 1){
                                location.reload();
                            } else {
                                $.cpk_alert(result.msg);
                            }
                        }
                    });  
                }
            });
        });
    }


    function onEmployerDelInviteBtn(){

        o_document.on("click",".J_del_invite",function(){
            var id = $(this).attr('rel');
            $.cpk_confirm("系统消息", "您确定要删除么？", function(result){
                if(result=="ok"){
                    $.ajax({
                      url : "/user/del_invite",
                      type: 'POST',
                      dataType: 'json',
                      data : {id:id},
                      success : function(result){
                        if(result.status == 1){
                                $("#invite_"+id).remove();
                            } else {
                                $.cpk_alert(result.msg);
                            }
                        }
                    });
                }
            });

        });
    }

    function onDelInvoiceBtn(){

        o_document.on("click",".J_del_invoice",function(){
            var id = $(this).attr('rel');
            $.cpk_confirm("系统消息", "您确定要删除么？", function(result){
                if(result=="ok"){
                    $.ajax({
                      url : "/user/del_invoice",
                      type: 'POST',
                      dataType: 'json',
                      data : {id:id},
                      success : function(result){
                        if(result.status == 1){
                                location.reload();
                            } else {
                                $.cpk_alert(result.msg);
                            }
                        }
                    });
                }
            });
        });
    }

    function onBuyToolsBtn(){

        onSelectToolsTimeBtn();

        $('.J_buybqws').live('click',function(){
            var buytype = $(this).attr("data-type");
            var taskid  = $(this).attr("data-taskid");
            if(buytype==''){
                $.cpk_alert("请选择购买周期");
                return;
            }
            $.ajax({
                url : '/user/buytools',
                type : "POST",
                dataType : "json",
                data : {buytype:buytype,tool:"bqws",taskid:taskid},
                success : function(res){
                    if(res.status==1){
                        window.location.href=res.data;
                    }else{
                        $.cpk_alert("错误");
                    }
                }
            });
        });
    }

    function onSelectToolsTimeBtn(){
        
        o_document.on("click",".J_bqws",function(){
            var o_this  = $(this);
            var buytype =o_this.attr("rel");
            var price   =o_this.attr("data-price");
            $('.J_bqws').removeClass("cur");
            o_this.addClass("cur");
            $('.J_buybqws').attr("data-type",buytype);
            $('#bqwsprice').text(price+"元");
        });
    }

    function onFinanceTypeChange(){

        o_document.on("change",".J_whichtype",function(){
            var val = $(this).val();
            var wm  = $("input[name=whichwm]").val();
            location.href='/user/finance/action/'+val+'/wm/'+wm;
        });
    }

    function onFinanceOrderTypeChange(){

        o_document.on("change",".J_whichordertype",function(){
            var val = $(this).val();
            location.href='/user/financeOrder/paystatus/'+val;
        });
    }

    function onSureRecharge(){

        o_document.on("click",".J_sure_recharge",function(){
            var money = $("input[name=cash]").val();
            if(money==""){
                $.cpk_alert("请填写充值金额");
                return false;
            }
            if(parseInt(money)==0){
                $.cpk_alert("金额不能小于1元");
                return false;
            }
            document.form1.submit();
        });
    }

    function onSureCashBtn(){


        o_document.on("blur","input[name=money]",function(){
            var money = $(this).val();
            var useramount  = $('input[name=useramount]').val();

            if(parseInt(money)<10){
                $("#j_cashmoney_error").html("提现金额必须大于10元").show();
                return;
            }
            if(money==""){
                $("#j_cashmoney_error").html("请填写提现金额").show();
                return;
            }
            if(parseInt(money)>parseInt(useramount)){
                $("#j_cashmoney_error").html("提现金额不能超过余额").show();
                return;
            }
            $("#j_cashmoney_error").html("").hide();
        });

        o_document.on("click",".J_sure_cash",function(){
            var accountpass = $('input[name=accountpass]').val();
            var money       = $('input[name=money]').val();
            var bank        = $('select[name=bank]').val();
            var useramount  = $('input[name=useramount]').val();

            var realnamechk = $('input[name=realnamechk]').val();
            var phonechk    = $('input[name=phonechk]').val();
            if(realnamechk==0){
                $.cpk_alert('请完成实名认证');
                return false;
            }
            if(phonechk==0){
                $.cpk_alert('请完成手机认证');
                return false;
            }
            if(bank == 0){
                $.cpk_alert('请选择您的银行卡');
                $('select[name=bank]').focus();
                return false;
            }else if(accountpass == ''){
                $.cpk_alert('支付密码必填');
                $('input[name=accountpass]').focus();
                return false;
            }else if(parseInt(money) == 0 || parseInt(money)>useramount){
                $.cpk_alert('取现金额必须大于0且小于等于您的余额');
                $('input[name=money]').focus();
                return false;
            }else if(parseInt(money) < 10){
                $.cpk_alert('提现金额必须大于10元');
                $('input[name=money]').focus();
                return false;
            }
            document.form1.submit();
        });
    }

    function on_CPK_tab_change(){

        o_document.on("click",".J_cpk_tab_li",function(){
            var o_this = $(this);
            var tab_divid = o_this.attr("data-divid");
            $(".J_cpk_tab_li").removeClass("hover");
            $(".j_cpk_tab_div").hide();
            o_this.addClass("hover");
            $(tab_divid).show();
        });
    }

    function on_CPK_datepicker_select(){

        $('#j_start_time').datepicker({
            autoclose: true,
            format: "yyyy-mm-dd"
        });
        $('#j_end_time').datepicker({
            autoclose: true,
            format: "yyyy-mm-dd"
        });
    }

    function onCollectSearchBtn(){

        o_document.on("click","#j_ucenter_mycollect_search",function(){
            var ccat       = $("#ccat").val();
            var start_time = $('input[name=start_time]').val();
            var end_time   = $('input[name=end_time]').val();
            var url = "/user/mycollect/ccat/"+ccat+"/start_time/"+start_time+"/end_time/"+end_time;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });
    }

    function onReportSearchBtn(){

        o_document.on("click","#J_search_report",function(){
            var rtype = $('select[name=rtype]').val();
            var rstatus = $('select[name=rstatus]').val();
            var start_time = $('input[name=start_time]').val();
            var end_time = $('input[name=end_time]').val();
            var sendReceiveType = $('input[name=sendReceiveType]').val();
            var url = "/user/report/rtype/"+rtype+"/rstatus/"+rstatus+"/start_time/"+start_time+"/end_time/"+end_time+"/sendReceiveType/"+sendReceiveType;
            $("#searchform").attr("action",url);
            $("#searchform").submit();
        });
    }

    function onBackMoneySearchBtn(){

        o_document.on("click","#J_search_backmoney",function(){
            var rtype = $('select[name=rtype]').val();
            var rstatus = $('select[name=rstatus]').val();
            var start_time = $('input[name=start_time]').val();
            var end_time = $('input[name=end_time]').val();
            var sendReceiveType = $('input[name=sendReceiveType]').val();
            var url = "/user/tuikuan/rtype/"+rtype+"/rstatus/"+rstatus+"/start_time/"+start_time+"/end_time/"+end_time+"/sendReceiveType/"+sendReceiveType;
            $("#searchform").attr("action",url);
            $("#searchform").submit();
        })
    }

    function onResendMsgBtn(){
        onSendresendMsg();
        o_document.on("click",".J_resend_msg",function(){
            var msgid = $(this).attr('rel');
            $.ajax({
                url : '/dialog/resendmsg',
                type : "POST",
                dataType : "json",
                data : {msgid:msgid,step:"getform"},
                success : function(res){
                    if(res.status == 1){
                        var info_temp = res.data;
                        $.dialog({id:'resendmsg_box', title:"回复站内信", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                    } else {
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }

    function onSendresendMsg(){

        o_document.on("click","#J_send_resendmsg",function(){
            var id    = $("input[name=msgid]").val();
            var title = $("input[name=title]").val();
            var info  = $("textarea[name=remsg_info]").val();
            var tuid  = $("input[name=touid]").val();
            var captcha  = $("input[name=captcha]").val();
            $.ajax({
                url : "/user/msgReply",
                dataType : 'json',
                type:'POST',
                data :{
                    msgid:id,
                    title:title,
                    info:info,
                    tuid:tuid,
                    captcha:captcha
                },
                success : function(result){
                    if (result.status == 1){
                        $.dialog.get('resendmsg_box').close();
                        $.cpk_alert_reload(result.msg);
                    }else{
                        $.cpk_alert(result.msg);
                    }
                }
            });
        });


    }

    function onSeeInvoiceBtn(){

        o_document.on("click",".J_seefapiao",function(){
            var id = $(this).attr("rel");
            $.ajax({
                url:'/dialog/seefapiao',
                type:"post",
                dataType:"json",
                data:{step:"getform",id:id,is_require_new:1},
                success:function(res){
                    if(res.status == 1){
                        var info_temp = res.data;
                        $.dialog({id:'jiaona_box', title:"查看发票", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                    } else {
                        $.cpk_alert(res.msg);
                    }
                }
            });
        });
    }

    function onEditInvoiceBtn(){
        o_document.on("click",".J_editInvoice",function(){
            var invoiceId = $(this).attr("rel");
            $.ajax({
                url : '/dialog/editInvoice',
                type : "POST",
                dataType : "json",
                data : {invoiceId:invoiceId,step:"getform",is_require_new:1},
                success : function(res){
                    if(res.status==1){
                        var info_temp = res.data; 
                        $.dialog({id:'invoice_box', title:"申请开票", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                    }else{
                        $.cpk_alert("错误");
                    }
                }
            });
        });
    }

    function onInviteSearchBtn(){

        o_document.on("click","#J_invite_search",function(){
            var tasktitle = $('input[name=tasktitle]').val();
            var storename = $('input[name=storename]').val();
            var search_title ="";
            var search_storename="";
            if(tasktitle!=""){
                search_title = "/tasktitle/"+tasktitle;
            }
            if(storename!=""){
                search_storename = "/storename/"+storename;
            }
            var url = "/user/invite"+search_title+search_storename;
            $("#postform").attr("action",url);
            $("#postform").submit();
        });

    }


});
