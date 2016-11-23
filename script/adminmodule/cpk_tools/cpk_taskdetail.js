define(['jquery','./cpk_user_selecthandle','./cpk_user_needchkphone','./cpk_kindeditor','./cpk_uploadify'],function($,CPK_user_selecthandle,CPK_user_needchkphone,CPK_kindeditor,CPK_uploadify){
//CPK_taskdetail
//----CPK_TASK_backmoneypro


    var CPK_TASK_backmoneypro = {
        createObj : function(){
            var obj = {};
            var o_input = $("input[name=backmoney_money]");
            var _intvalue;
            var _taskmoney = parseInt($("input[name=taskmoney]").val(),10);
            obj.init = function(){
                onKeyUpAndAfterpaste();
            }
            function onKeyUpAndAfterpaste(){
                o_input.on("keyup",function(){
                    checkValue();
                    //changeBackmoneyValue();
                });
                o_input.on("paste",function(){
                    setTimeout(function() {
                        o_input.trigger("keyup");
                    }, 10);
                });
            }
            function checkValue(){
                var thisvalue = o_input.val();
                o_input.val(thisvalue.replace(/\D/g,''));
                _intvalue = parseInt(o_input.val(),10);
                if(_intvalue>_taskmoney){
                    o_input.val(_taskmoney);
                    _intvalue = _taskmoney;
                }
                if(_intvalue<1){
                    o_input.val(0);
                    _intvalue = 0;
                }
                if(isNaN(_intvalue)){
                    _intvalue =0;
                }
            }
            // function changeBackmoneyValue(){
            //     var backmoney = _taskmoney*_intvalue/100;
            //     $("#j_backmoney").text(backmoney);
            // }



            return obj;
        }
    }


    var CPK_taskdetail = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var endtime,__time;

            var needPhoneSend_box;


            obj.init = function(){
                onRetaskEditBtn();
                onRetaskTabLoad();
                onEndtime();
                onAddMoreInfoBtn();
                onTaskSignUp();
                onSubmitRetaskPost();
                onSendTaskCommentBtn();
                onInviteWitkey();
                onBuyServiceBtn();
                onMortimeMoreMoneyBtn();
                onSetInBtn();
                onAgreementDownBtn();
                onUploadSourceBtn();
                onCheckTaskOkBtn();
                onSeeSourceBtn();
                onRecommendWitkeyBtn();
                onRecommendNotSetInWitkeyBtn();
                onRecommendEmployerBtn();
                onBackMoneyBtn();
                onSeeBackMoneyInfoBtn();
                onNotBackMoneyBtn();
                onToolsBtn();
                onDelectTaskRecomment();

                //直接雇佣的
                onBackEmployTaskBtn();
                onAcceptOrNotAcceptEmployTaskBtn();
                onEmployTaskUploadFileBtn();

            }
            function onRetaskEditBtn(){
                o_document.on("click",'.J_edit_retask',function(){
                    var retaskid = $(this).attr("rel");
                     $.ajax({
                        url : '/taskdetail/edittaskbid',
                        type : "POST",
                        dataType : "json",
                        data : {retaskid:retaskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_info_box_c', title:"修改稿件", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'710px'});
                                onEditFormLoad();
                                onShowUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                     });
                });
            }
            function onEditFormLoad(){
                if($('.j_kindeditor').length>0){
                    var textareaID  = $('.j_kindeditor').attr("data-id");
                    var _kindeditor = CPK_kindeditor.createObj();
                    _kindeditor.init({'textareaID':textareaID});
                }
            }

            function onShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "task_bid","inputFileId":"#retaskfile_upload"});
            }
            
            function onRetaskTabLoad(){
                o_document.on("click",".J_retask_tab_title",function(){
                    var o_this = $(this);
                    var divEle = o_this.attr("data-tabdiv");
                    $(".J_retask_tab_title").removeClass("selected");
                    $(".j_retask_tab_content").hide();
                    $(divEle).show();
                    o_this.addClass("selected");
                });
            }

            function onSendTaskCommentBtn(){
                /* 任务留言 */
                o_document.on("click",".J_taskcommentSend",function(){
                    var msginfo = $('textarea[name="msginfo"]').val();
                    var id = $(this).attr('rel');
                    $.ajax({
                        url : "/home/taskdetail/savemsg",
                        type : 'POST',
                        dataType : 'json',
                        data : {info:msginfo, type:'task', tid:id},
                        success : function(result){
                            if(result.status == 1){
                                $.cpk_alert_reload(result.msg);
                            } else {
                                $.cpk_alert(result.msg);
                            }
                        }
                    });
                });
            }
            function onEndtime(){
                if($(".endtimeS").length>0){
                    endtime = parseInt($('.endtimeS').attr('rel'));
                    __time  = endtime;
                    startGoSecond();
                }
            }
            function startGoSecond(){
                setTimeout(MillisecondToDate,1000);
            }

            function MillisecondToDate() {
                __time = parseInt(__time - 1);
                var showtime;
                if (null!= __time && ""!= __time) {
                    var seconds = __time; // time / 1000;
                    var minutes = Math.floor(__time / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);
                    var CDay = days;
                    var CHour = hours % 24;
                    var CMinute = minutes % 60;
                    var CSecond = Math.floor(seconds % 60);
                    showtime = CDay + '天' + CHour + '时' + CMinute + '分' + CSecond + '秒';
                    if(CDay < 0){
                        showtime="";
                    }else{
                        startGoSecond();
                    }
                }else{
                    showtime = "0天0时0分0秒";
                }
                $('.endtimeS').text(showtime);
            }

            function onAddMoreInfoBtn(){
                onSendMoreInfo();
                // 描述补充
                o_document.on("click",".J_moreinfo",function(){
                    //$('.moreinfoSave').die('click');
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/taskdetail/addmoreinfo",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_info_box_moreinfo', title:"描述补充", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                showAddMoreInfoUploadify();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendMoreInfo(){
                o_document.on("click",".J_moreinfoSave",function(){
                    var moreinfo = $('textarea[name=moreinfo]').val();
                    var taskid   = $('input[name=taskid]').val();
                    var fileid   = $('input[name=fileid]').val();
                    $.ajax({
                        url    : "/taskdetail/savemoreinfo",
                        type   : "POST",
                        dataType : "json",
                        data     : {moreinfo:moreinfo, taskid:taskid, fileid:fileid ,step:"saveform"},
                        success  : function(res){
                            if(res.status == 1){
                                $.dialog.get('alert_info_box_moreinfo').close();
                                $.cpk_alert_reload(res.msg);
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function showAddMoreInfoUploadify(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "taskmoreinfo","inputFileId":"#addmoreinfofile_upload"});
            }

            function onTaskSignUp(){

                o_document.on("click",".J_iwant",function(){
                    var o_this = $(this);
                    if(typeof needPhoneSend_box == "undefined"){
                        needPhoneSend_box = CPK_user_needchkphone.createObj();
                    }
                    if(needPhoneSend_box.is_init()){
                        var phone_status = needPhoneSend_box.getPhoneCheckedStatus();
                        if(phone_status==0){
                            needPhoneSend_box.openBindPhoneDialog();
                            return;
                        }
                        if(phone_status==-1){
                            showLoginForm();
                            return;
                        }
                        if(phone_status==1){
                            var taskid = o_this.attr('rel');
                            _startSignup(taskid);
                        }
                    }else{
                        needPhoneSend_box.init(function(){
                            $("#j_can_close_phone_box").removeClass("hidden");
                            var phone_status = needPhoneSend_box.getPhoneCheckedStatus();
                            if(phone_status==0){
                                needPhoneSend_box.openBindPhoneDialog();
                                return;
                            }
                            if(phone_status==-1){
                                showLoginForm();
                                return;
                            }
                            if(phone_status==1){
                                var taskid = o_this.attr('rel');
                                _startSignup(taskid);
                            }
                        });
                    }
                });
            }
            function _startSignup(taskid){
                $.ajax({
                    url : "/taskdetail/signup",
                    dataType : 'json',
                    type:'POST',
                    data :{taskid:taskid},
                    success : function(result){
                        if(result.status==2){
                            var info = result.data;
                            $.dialog({id:'alert_signup_box', title:"温馨提示", content:info, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                        }else{
                            if(result.status==1){
                                $.cpk_alert_reload(result.msg);
                            }else if(result.status==-1){
                                showLoginForm();
                            }else{
                                $.cpk_alert(result.msg);
                            }
                        }
                    }
                });
            }

            function onSubmitRetaskPost(){

                o_document.on("click",".J_retaskpost",function(){
                    var cc=true;
                    if($('input[name=notAllowPost]').val()==1){
                        $.cpk_alert("不符合条件无法提交");
                        cc= false;
                    }
                    if($('textarea[name=sinfo]').val()==""){
                        $.cpk_alert("内容必填");
                        cc= false;
                    }
                    if($('input[name=captcha]').val()==""){
                        $.cpk_alert("验证码必填");
                        cc= false;
                    }
                    if(!cc){
                        return false;
                    }else{
                        postRetaskData();
                    }
                });
            }
            function postRetaskData(){
                var taskid  = $('input[name=taskid]').val();
                var sinfo   = $('textarea[name=sinfo]').val();
                var captcha = $('input[name=captcha]').val();
                var fileid  = $('input[name=fileid]').val();
                var tools   = $('input[name=tools]').val();
                if($('#j_cpczInput').length>0){
                    var tools_cpcz = $("#j_cpczInput").is(':checked') ? 1 :0;
                }else{
                    var tools_cpcz = $('input[name=tools_cpcz]').val();
                }
                
                $.ajax({
                    url : "/taskdetail/addtaskbid",
                    dataType : 'json',
                    type:'POST',
                    data :{taskid:taskid,sinfo:sinfo,captcha:captcha,fileid:fileid,tools:tools,tools_cpcz:tools_cpcz},
                    success : function(result){
                        if(result.status==1){
                            window.location.reload();
                            //$.cpk_alert_reload(result.msg);
                        }else{
                            $.cpk_alert(result.msg);
                        }
                    }
                });
            }

            function onInviteWitkey(){
                onRefreshInviteBtn();
                var _user_selecthandle = CPK_user_selecthandle.createObj();

                o_document.on("click",".J_invitewk",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url  : "/dialog/invite",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid, step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'invite_box', title:"邀请人才", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                                
                                if(_user_selecthandle.getIsInit()==0){
                                    _user_selecthandle.init();
                                }

                            } else {
                                $.cpk_alert(res.msg);
                            }

                        }
                    });
                });
            }

            function onRefreshInviteBtn(){
                o_document.on("click","#J_refresh_weike",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/dialog/invite",
                        type : "POST",
                        dataType : "json",
                        data : {
                            step:"refresh",
                            taskid:taskid
                        },
                        success : function(res){
                            if(res.status == 1){
                                $('.j_invite_body_box').html(res.data);
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });  
            }

            function onBuyServiceBtn(){
                o_document.on("click",".J_moreservices",function(){
                    var taskid    = $(this).attr('rel');
                    var serviceid = $(this).attr("data-sid");
                    $.ajax({
                        url : "/taskdetail/moreservices",
                        type : "POST",
                        dataType : "json",
                        data : {serviceid:serviceid,taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                var info_temp = res.data;
                                $.dialog({id:'alert_aboutcopyright_box', title:"请选择需要的服务", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            }
                        }
                    });
                });
            }

            function onMortimeMoreMoneyBtn(){
                $('.J_x_moretime_moremoney').click(function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/taskdetail/addmoretimemoremoney",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_x_moretime_box', title:"延期征稿", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSetInBtn(){
                $('.J_task_set_in').live('click', function(){
                    var tid = $(this).attr('tid');
                    var bid = $(this).attr('bid');
                    var uid = $(this).attr('uid');
                    var val = 0;

                    var data = {};
                    data.tid = tid;
                    data.bid = bid;
                    data.uid = uid;
                    data.val = val;
                    data.restatus = 1;
                    
                    $.cpk_confirm("系统消息", "确定要设置该稿件中标么？确认后将不可再修改", function(result){
                        if(result=="ok"){
                            set_save(data);
                        }
                    });
                });
            }

            function set_save(data){
                $.ajax({
                    url : "/taskdetail/taskbidselect",
                    type: 'POST',
                    dataType: 'json',
                    data : data,
                    success : function(result){
                        if(result.status == 1){
                            window.location.reload();
                        } else {
                            $.cpk_alert(result.msg);
                        }
                    }
                });
            }

            function onAgreementDownBtn(){
                $('.J_get_intellectual').click(function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/taskdetail/intellectual",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            var info_temp = res.data;
                            $.dialog({id:'alert_intellectual_box', title:"产权协议书", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                        }
                    });
                });
            }
            function onUploadSourceBtn(){
                onPostUploadSource();
                

                $('.J_uploadsource').click(function(){
                    $('.uploadsourceSave').die('click');
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : '/dialog/uploadsource',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_info_box_c', title:"上传源文件", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                onShowsourceUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });


            }
            function onPostUploadSource(){
                /* 提交表单 信息保存（将附件提交的信息及文字信息） */
                o_document.on("click",".J_uploadsourceSave",function(){
                    var moreinfo = $('input[name=moreinfo]').val();
                    var taskid = $('input[name=taskid]').val();
                    var fileid = $('input[name=fileid]').val();
                    $.ajax({
                        url: "/dialog/uploadsource",
                        type: "POST",
                        dataType: "json",
                        data: {moreinfo: moreinfo, taskid: taskid, fileid: fileid,step:"saveform"},
                        success: function (res) {
                            if (res.status == 1) {
                                window.location.href = "/task/"+taskid;
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onShowsourceUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"fileSizeLimit":"50MB","uploadType": "uploadsource","inputFileId":"#uploadsourcefile_upload"});
            }

            function onCheckTaskOkBtn(){
                o_document.on("click",".J_checktaskok",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : '/taskdetail/checktaskover',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_info_box_c', title:"确认验收", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }
            function onSeeSourceBtn(){

                o_document.on("click",".J_seesource",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : '/dialog/seesource',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_info_box_c', title:"查看源文件", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }

                        }
                    });
                });
            }

            function onRecommendWitkeyBtn(){

                o_document.on("click",".J_recommendWitkeyBtn",function(){
                    var taskid = $(this).attr('rel');
                    var uid = $(this).attr('uid');
                    $.ajax({
                        url : "/taskdetail/evaluatewitkey",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid, uid:uid},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_recommend_box', title:"评价", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onRecommendNotSetInWitkeyBtn(){

                o_document.on("click",".J_recommendNotSetInWitkeyBtn",function(){
                    var taskid = $(this).attr('rel');
                    var uid = $(this).attr('uid');
                    $.ajax({
                        url : "/taskdetail/evaluatewitkey",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid, uid:uid},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_recommend_box', title:"评价", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onRecommendEmployerBtn(){

                o_document.on("click",".J_recommendHireBtn",function(){
                    var taskid = $(this).attr('rel');
                    var uid    = $(this).attr('uid');
                    $.ajax({
                        url : "/taskdetail/evaluateemployer",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_recommend_box', title:"评价", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });  
                });
            }

            function onBackMoneyBtn(){
                onSendBackMoney();

                $('.J_backmoney').click(function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/home/backmoney/tasking",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid, step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                $.dialog({id:'alert_backmoney_box', title:"申请退款", content:res.data, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                
                                var _backmoneypro = CPK_TASK_backmoneypro.createObj();
                                _backmoneypro.init();

                                onShowBackMoneyUploadify();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendBackMoney(){

                o_document.on("click",".J_backmoney_save",function(){
                    var b_info        = $('textarea[name=b_info]').val();
                    var b_taskid      = $('input[name=b_taskid]').val();
                    var fileid        = $('input[name=fileid]').val();
                    var backmoney_money = $('input[name=backmoney_money]').val();
                    var btype         = $('input[name=btype]').val();

                    if(btype==0){
                        $.cpk_alert("选择退款类型");
                        return;
                    }
                    if(b_info==""){
                        $.cpk_alert("内容不能为空");
                        return;
                    }
                    if(backmoney_money=="" || parseInt(backmoney_money)<=0 ){
                        $.cpk_alert("请填写正确的退款金额");
                        return;
                    }
                    $.ajax({
                        url : "/backmoney/tasking",
                        type : "POST",
                        dataType : "json",
                        data : {b_info:b_info, taskid:b_taskid, step:"saveinfo",fileid:fileid, backmoney_money:backmoney_money, btype:btype},
                        success : function(res){
                            if(res.status == 1){
                                //$.cpk_alert(res.msg);
                                window.location.href = "/task/"+b_taskid;
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });

                });
            }

            function onShowBackMoneyUploadify(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "task_bid","inputFileId":"#backmoneyfile_upload"});
            }

            function onSeeBackMoneyInfoBtn(){
                onAccptBackMoneyOrNot();

                o_document.on("click","#J_see_backmoney_info",function(){
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : "/home/backmoney/seeinfo",
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid, step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                $.dialog({id:'alert_backmoney_box', title:"申请退款", content:res.data, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onAccptBackMoneyOrNot(){
                o_document.on("click","#J_accept_backmoney",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定同意退款", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/home/backmoney/accept_task_backmoney",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        $.cpk_alert(res.msg);
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });
                });

                o_document.on("click","#J_notAccept_backmoney",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定拒绝退款", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/home/backmoney/notAccept_backmoney",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });
                });
            }


            function onNotBackMoneyBtn(){

                o_document.on("click","#J_not_backmoney",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定撤销申请", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/taskdetail/abandonbackmoney",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        $.cpk_alert_reload(res.msg);
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onToolsBtn(){
                if($('.J_toolscheck').is(':checked')) {
                    $('.j_visitortoolsnum').show();
                }

                o_document.on("click",".J_toolscheck",function(){
                    var checked = $(this).attr('checked');
                    if(checked == 'checked'){
                        $('.j_visitortoolsnum').show();
                    } else {
                        $('.j_visitortoolsnum').hide();
                    }
                });

            }


            function onBackEmployTaskBtn(){

                o_document.on("click",".J_back_employ_task",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定要放弃这个任务？", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/taskdetail/abandontask",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        $.cpk_alert_reload(res.msg)
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onAcceptOrNotAcceptEmployTaskBtn(){

                o_document.on("click",".J_acceptBtn",function(){
                    var val    = parseInt($(this).attr('rel'));
                    var taskid = $(this).attr('tid');
                    var confirmInfo;
                    if(val==2){
                        confirmInfo = "确定要放弃承接";
                        posturl     = "/taskdetail/tasktonotaccept";
                    }else if(val==1){
                        confirmInfo = "确定接受承接";
                        posturl     = "/taskdetail/tasktoaccept";
                    }else{
                        return;
                    }
                    $.cpk_confirm("系统消息", confirmInfo, function(result){
                        if(result == "ok"){
                            $.ajax({
                                url : posturl,
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status==1){
                                        $.cpk_alert_reload(res.msg);
                                    }else if(res.status == -1){
                                        showLoginForm();
                                    }else{
                                        $.cpk_alert(res.msg);
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onEmployTaskUploadFileBtn(){
                onSendUploadsourceAndPost();



                o_document.on("click",".J_employuploadfile",function(){
                    $('.uploadsourceAndpostSave').die('click');
                    var taskid = $(this).attr('rel');
                    $.ajax({
                        url : '/dialog/uploadsourceAndPost',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'alert_info_box_c', title:"确认完成", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                onShowsourceUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendUploadsourceAndPost(){


                o_document.on("focus","input[name=moreinfo]",function(){
                    if($('input[name=moreinfo]').val() == "请您验收"){
                        $('input[name=moreinfo]').val('');
                    }
                });

                o_document.on("blur","input[name=moreinfo]",function(){
                    if($(this).val()=="" || typeof $(this).val() == "undefined"){
                        $('input[name=moreinfo]').val('请您验收');
                    }
                });

                o_document.on("click",".J_uploadsourceAndPostSave",function(){
                    var moreinfo = $('input[name=moreinfo]').val();
                    var taskid   = $('input[name=taskid]').val();
                    var fileid   = $('input[name=fileid]').val();
                    $.ajax({
                        url: "/dialog/uploadsourceAndPost",
                        type: "POST",
                        dataType: "json",
                        data: {moreinfo: moreinfo, taskid: taskid, fileid: fileid,step:"saveform"},
                        success: function (res) {
                            if (res.status == 1) {
                                window.location.href = "/task/"+taskid;
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onDelectTaskRecomment(){

                o_document.on("click",".J_recomment_del",function(){
                    var recommentid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定要删除", function(result){
                        if(result == "ok"){
                             $.ajax({
                                url : '/taskdetail/delrecomment',
                                type : "POST",
                                dataType : "json",
                                data : {recommentid:recommentid},
                                success : function(res){
                                    if(res.status == 1){
                                        $.cpk_alert_reload(res.msg);
                                    } else {
                                        $.cpk_alert(res.msg);
                                    }
                                }
                             });
                        }
                    });
                });
            }

            return obj;
        }
    }





    return CPK_taskdetail;
});
