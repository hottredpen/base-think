define(['jquery','./cpk_kindeditor','./cpk_uploadify','datepicker','fullcalendar','fc_zh_cn'],function($,CPK_kindeditor,CPK_uploadify){
    var CPK_monthtaskdetail = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var endtime,__time;
            var leavestartdate;

            obj.init = function(){
                onRetaskEditBtn();
                onRetaskTabLoad();
                onEndtime();

                onSendTaskCommentBtn();
                onAgreementDownBtn();
                onUploadSourceBtn();
                onCheckTaskOkBtn();
                onSeeSourceBtn();
                onRecommendWitkeyBtn();
                onRecommendEmployerBtn();
                onDelectTaskRecomment();

                //直接雇佣的
                onBackEmployTaskBtn();
                onAcceptOrNotAcceptEmployTaskBtn();
                //onEmployTaskUploadFileBtn();

                //包月雇佣
                onPublishTasksonBtn();
                onEditTasksonBtn();
                onAcceptTasksonBtn();
                onTasksonPostFormBtn();
                onEditRetaskSonBtn();
                onTasksonOkBtn();
                onTasksonNotPassBtn();
                onMonthSignUpBtn();
                onWorkSignUpBtn();
                onWorkLeaveBtn();
                onAcceptLeaveBtn();
                onNotAcceptLeaveBtn();
                onFireWitkeyBtn();
                onNotFireWitkeyBtn();
                onAcceptFireBtn();
                onNotAcceptFireBtn();
                onSeeFireInfoBtn();
                onMonthOver();


                onNotPassReasonAlertBtn();

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

            function showAddMoreInfoUploadify(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "taskmoreinfo","inputFileId":"#addmoreinfofile_upload"});
            }

            function postRetaskData(){
                var taskid  = $('input[name=taskid]').val();
                var sinfo   = $('textarea[name=sinfo]').val();
                var captcha = $('input[name=captcha]').val();
                var fileid  = $('input[name=fileid]').val();
                var tools   = $('input[name=tools]').val();
                var tools_cpcz = $('input[name=tools_cpcz]').val();
                $.ajax({
                    url : "/task/savefile",
                    dataType : 'json',
                    type:'POST',
                    data :{taskid:taskid,sinfo:sinfo,captcha:captcha,fileid:fileid,tools:tools,tools_cpcz:tools_cpcz},
                    success : function(result){
                        if(result.status==1){
                            $.cpk_alert_reload(result.msg);
                        }else{
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
                        data : {taskid:taskid,uid:uid},
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


            function onShowBackMoneyUploadify(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "task_bid","inputFileId":"#backmoneyfile_upload"});
            }

            function onBackEmployTaskBtn(){

                o_document.on("click",".J_back_employ_task",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定要放弃本次雇佣？", function(result){
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
                        confirmInfo = "确定要放弃雇佣";
                        posturl     = "/taskdetail/tasktonotaccept";
                    }else if(val==1){
                        confirmInfo = "确定接受雇佣";
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
                                data : {val:val,taskid:taskid,step:"set"},
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

            function onPublishTasksonBtn(){

                onSendPublishTaskson();

                o_document.on("click",".J_addtaskson",function(){
                    var taskid = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/addtaskson',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"getform","is_require_new":1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'monthtask_addtaskson_form', title:"添加任务", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                                onTasksonKindeditorFormLoad();
                                onShowTasksonUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendPublishTaskson(){
                o_document.on("click",".J_post_addtaskson",function(){
                    var taskid = $("input[name=taskid]").val();
                    var q_info = $("textarea[name=q_info]").val();
                    var fileid = $("input[name=fileid]").val();
                    var title  = $("input[name=title]").val();
                    if(title==""){
                        $.cpk_alert("标题不能为空");
                    }
                    if(q_info==""){
                        $.cpk_alert("内容不能为空");
                    }
                    $.ajax({
                        url : '/dialog/addtaskson',
                        type : "POST",
                        dataType : "json",
                        data : {taskid:taskid,step:"saveform","q_info":q_info,fileid:fileid,title:title},
                        success : function(res){
                            if(res.status == 1){
                                $.cpk_alert_reload(res.msg);
                                $.dialog.get('monthtask_addtaskson_form').close();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });


                });
            }

            function onTasksonKindeditorFormLoad(){
                if($('.j_kindeditor').length>0){
                    var textareaID  = $('.j_kindeditor').attr("data-id");
                    var _kindeditor = CPK_kindeditor.createObj();
                    _kindeditor.init({'textareaID':textareaID});
                }
            }

            function onShowTasksonUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "taskson","inputFileId":"#tasksonfile_upload"});
            }

            function onAcceptTasksonBtn(){

                o_document.on("ontasksonAcceptDone",function(e,msg,tasksonid,actime){
                    $("#j_accepttasksontime_"+tasksonid).text('接受时间：'+actime);
                    $("#taskson_handle_"+tasksonid).html('<font>工作中</font> <a href="javascript:;" class="J_getposttasksonform button" rel="'+tasksonid+'">交稿件</a>');
                });

                o_document.on("click",".J_accept_taskson",function(){
                    var btn       = $(this);
                    var tasksonid = btn.attr("rel");
                    
                    if(!btn.hasClass("J_accept_taskson")){
                        return;
                    }
                    $.ajax({
                        url : '/user/tasksonAccept',
                        type : "POST",
                        dataType : "json",
                        data  :{tasksonid:tasksonid},
                        success : function(res){
                            if(res.status==1){
                                btn.trigger("ontasksonAcceptDone",[res.msg,tasksonid,res.data]);
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onTasksonPostFormBtn(){

                onSendTasksonBtn();

                $(".J_getposttasksonform").live("click",function(){
                    var tasksonid = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/savefortaskson',
                        type : "POST",
                        dataType : "json",
                        data : {tasksonid:tasksonid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'posttasksonform', title:"提交任务稿件", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'720px'});
                                onTasksonKindeditorFormLoad();
                                onShowTasksonPostUploadifyBtn();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendTasksonBtn(){

                o_document.on("click",".J_sendTaskson_submit",function(){
                    var q_info = $('textarea[name="q_info"]').val();
                    var fileid = $('input[name=fileid]').val();
                    var tasksonid = $('input[name=tasksonid]').val();
                    if(q_info==""){
                        $.cpk_alert("内容不能为空");
                    }else{
                        $.ajax({
                            url : "/dialog/savefortaskson",
                            type : 'POST',
                            dataType : 'json',
                            data : {q_info:q_info, fileid:fileid,tasksonid:tasksonid, step:"saveform"},
                            success : function(result){
                                if(result.status == 1){
                                    $.cpk_alert_reload('提交成功');
                                    $.dialog.get('posttasksonform').close();
                                } else {
                                    $.cpk_alert(result.msg);
                                }
                            }
                        }); 
                    }

                });
            }

            function onShowTasksonPostUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "taskson_bid","inputFileId":"#tasksonpostfile_upload"});
            }

            function onTasksonOkBtn(){

                o_document.on("tasksonokDone",function(e, msg,tasksonid){
                    $("#taskson_handle_"+tasksonid).html('<font>完成</font>');
                });

                o_document.on("click",".J_taskson_ok",function(){
                    var btn       = $(this);
                    var tasksonid = btn.attr("rel");
                    $.cpk_confirm("系统消息", "确认验收通过", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : '/user/tasksonOK',
                                type : "POST",
                                dataType : "json",
                                data : {tasksonid:tasksonid},
                                success : function(res){
                                    if(res.status == 1){
                                        btn.trigger("tasksonokDone",[res.msg,tasksonid]);
                                    } else {
                                        $.cpk_alert(res.msg);
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onTasksonNotPassBtn(){

                onSendNotPassreason();

                o_document.on("notpasstasksonDone",function(e, msg,tasksonid){
                    $("#taskson_handle_"+tasksonid).html('<font>等待修改</font>');
                });

                o_document.on("click",".J_taskson_notok",function(){
                    var btn       = $(this);
                    var tasksonid = btn.attr("rel");
                    $.ajax({
                        url : '/dialog/notpasstaskson',
                        type : "POST",
                        dataType : "json",
                        data : {tasksonid:tasksonid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_notpasstaskson_box', title:"任务验收不通过", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendNotPassreason(){
                o_document.on("click","#J_notpasstasksonBtn",function(){
                    var o_this    = $(this);
                    var tasksonid = $("input[name=tasksonid]").val();
                    var reason    = $("textarea[name=reason]").val();
                    if(reason==""){
                        $.cpk_alert("内容不能为空");
                    }else{
                        $.ajax({
                            url:"/dialog/notpasstaskson",
                            type:"POST",
                            dataType:"json",
                            data:{reason:reason,tasksonid:tasksonid,step:"saveform"},
                            success:function(res){
                                if(res.status==1){
                                    o_this.trigger("notpasstasksonDone",[res.msg,tasksonid]);
                                    $.dialog.get('alert_notpasstaskson_box').close();
                                }else{
                                    $.cpk_alert(res.msg);
                                }
                            }
                        });
                    }

                });
            }

            function onMonthSignUpBtn(){
                
                o_document.on("monthsignup",function(e,id){
                    _monthsignup(id);
                });

                o_document.on("click",".J_month_showworktime",function(){
                    var taskid =$(this).attr("rel");
                    $('.J_tan_qiandao').show();
                    $('.J_tan_qiandao').trigger("showcalendar",[taskid]);
                });

                o_document.on("click",".J_qiandao_return",function(){
                    $('.J_tan_qiandao').hide();
                });

                o_document.on("showcalendar",function(e,taskid){
                    $('#calendar').fullCalendar({
                        lang: "zh-cn",
                        editable: false,
                        events: "/user/monthevents/taskid/"+taskid,
                        loading: function(bool) {
                            if (bool) $('#loading').show();
                            else $('#loading').hide();
                        }
                    });
                    $('.J_tan_qiandao').off("showcalendar");
                });

                o_document.on("mouseover",".J_tan_qiandao",function(){
                    $('.J_tan_qiandao').show();
                }).on("mouseleave",".J_tan_qiandao",function(){
                    $('.J_tan_qiandao').hide();
                });

            }

            function onWorkSignUpBtn(){
                o_document.on("click",".J_month_worksignup",function(){
                    var id = $(this).attr("rel");
                    _monthsignup(id);
                });
            }

            function _monthsignup(id){
                var thisbtn = $(".worksignup"+id);
                thisbtn.attr("href","javascript:");
                var oldtext=$(".worksignup"+id+" > div > span").text();
                var oldfont=$(".worksignup"+id+" > div > font").text();
                var oldbg = thisbtn.css("background-color");
                var d = new Date();
                $(".worksignup"+id+" > div > span").text("打卡中...");
                thisbtn.css({"background-color":"#19ABF9","border-color":"#19ABF9"});
                
                $(".worksignup"+id).on('done',function(e,msg,data){
                     $(".worksignup"+id+" > div > span").text(data);
                     $(".worksignup"+id+" > div > font").text(data);
                     thisbtn.off('done');//取消监听
                });

                $(".worksignup"+id).on('failed',function(e,msg){
                        
                        $(".worksignup"+id+" > div > span").text(oldtext);
                        $(".worksignup"+id+" > div > font").text(oldfont);
                        thisbtn.css("background-color",oldbg);
                        thisbtn.css("border-color","#fff");
                        thisbtn.attr("href","javascript:monthsignup("+id+")");
                        thisbtn.off('failed');//取消监听
                        $.cpk_alert(msg);
                });
                $.ajax({
                    url : '/user/monthsignup',
                    type : "POST",
                    dataType : "json",
                    data  :{id:id},
                    success : function(res){
                        if(res.status == 1){
                            thisbtn.trigger('done',[res.msg,res.data]);
                        }else{
                            thisbtn.trigger('failed',[res.msg]);
                        }
                    }
                });
            }

            function onWorkLeaveBtn(){

                onSendWorkLeaveBtn();

                o_document.on("click",".J_monthLeave",function(){
                    $("#tasktotime_start").off("changeemploydate");
                    var taskid=$(this).attr("rel");
                    $.ajax({
                        url : '/dialog/monthLeave',
                        type : "POST",
                        dataType : "json",
                        data  :{taskid:taskid,step:'getform',is_require_new:1},
                        success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_monthleave_box', title:"请假原因", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                                onSelectedLeaveDay();
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSelectedLeaveDay(){
                $('#leavestartInput').datepicker({
                    container : "#detepicker_botton_box",
                    autoclose: true,
                    startDate : '0d',
                    format: "yyyy-mm-dd"
                });

                o_document.on("blur","#leavestartInput",function(){
                    setTimeout(function(){
                        var s_date = $('#leavestartInput').datepicker("getUTCDate");
                        leavestartdate =  s_date.getDate();
                        onleaveendshow();
                    },100);
                });
                


            }

            function onleaveendshow(){
                $('#leaveendInput').datepicker({
                    container : "#detepicker_botton_box",
                    autoclose: true,
                    startDate : '0d',
                    format: "yyyy-mm-dd",
                    beforeShowDay: function (date){
                        if (date.getMonth() == (new Date()).getMonth())
                            if(date.getDate()<leavestartdate){
                                return false;
                            }
                    }
                });
            }

            function onSendWorkLeaveBtn(){

                o_document.on("click","#J_monthLeaveBtn",function(){
                    var taskid    = $("input[name=taskid]").val();
                    var reason    = $("textarea[name=reason]").val();
                    var startdate = $("input[name='start_time']").val();
                    var enddate   = $("input[name='end_time']").val();
                    if(startdate=="" || enddate==""){
                        $.cpk_alert("请选择请假日期");
                        return;
                    }
                    if(reason==""){
                        $.cpk_alert("请填写请假原因");
                        return;
                    }
                    $.ajax({
                        url:"/dialog/monthleave",
                        type:"POST",
                        dataType:"json",
                        data:{startdate:startdate,enddate:enddate,reason:reason,taskid:taskid,step:"saveform"},
                        success:function(res){
                           if(res.status==1){
                                $.dialog.get("alert_monthleave_box").close();
                                $.cpk_alert(res.msg);
                                window.location.reload();
                           }else{
                                $.cpk_alert(res.msg);
                           }
                        }
                    });
                });

            }

            function onAcceptLeaveBtn(){

                o_document.on("click","#J_accept_monthleave",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定同意本次请假", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/home/task/accept_monthleave",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        location.reload();
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onNotAcceptLeaveBtn(){
                onSendNotAcceptLeaveBtn();

                o_document.on("click","#J_notAccept_monthleave",function(){
                    var taskid = $(this).attr('rel');
                     $.ajax({
                        url : '/dialog/notAccept_monthleave',
                        type : "POST",
                        dataType : "json",
                        data  :{taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_monthleave_box', title:"不同意请假", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onSendNotAcceptLeaveBtn(){

                o_document.on("click","#J_send_monthLeaveBtn",function(){
                    var taskid = $("input[name=taskid]").val();
                    var id     = $("input[name=id]").val();
                    var reason = $("textarea[name=reason]").val();
                    if(reason==""){
                            $.cpk_alert("请填写拒绝原因");
                            return;
                    }
                    $.ajax({
                            url:"/dialog/notAccept_monthleave",
                            type:"POST",
                            dataType:"json",
                            data:{id:id,reason:reason,taskid:taskid,step:"saveform"},
                            success:function(res){
                                   if(res.status==1){
                                            $.dialog.get("alert_monthleave_box").close();
                                            $.cpk_alert(res.msg);
                                            window.location.reload();
                                   }else{
                                            $.cpk_alert(res.msg);
                                   }
                            }
                    });
                });
            }

            function onFireWitkeyBtn(){
                o_document.on("click",".J_fire_witkey",function(){
                     var taskid = $(this).attr("rel");
                     $.ajax({
                      url : '/dialog/fireWitkey',
                      type : "POST",
                      dataType : "json",
                      data  :{taskid:taskid,step:"getform",is_require_new:1},
                      success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_paytoweike_box', title:"解雇人才", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                                onFireWitkeyShowUploadifyBtn();
                            }else{
                                $.cpk_alert(res.msg);
                            }
                      }
                     });
                });
            }

            function onFireWitkeyShowUploadifyBtn(){
                var _uploadify = CPK_uploadify.createObj();
                _uploadify.init({"uploadType": "backmoney","inputFileId":"#backmoneyfile_upload"});
            }

            function onNotFireWitkeyBtn(){
                

                o_document.on("click","#J_backfirewitkey",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定撤销解雇", function(result){
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

            function onAcceptFireBtn(){

                o_document.on("click","#J_accept_fire",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定同意解雇", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/home/task/accept_fire",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        location.reload();
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onNotAcceptFireBtn(){

                o_document.on("click","#J_notAccept_fire",function(){
                    var taskid = $(this).attr('rel');
                    $.cpk_confirm("系统消息", "确定拒绝解雇", function(result){
                        if(result=="ok"){
                            $.ajax({
                                url : "/home/task/notAccept_fire",
                                type : "POST",
                                dataType : "json",
                                data : {taskid:taskid},
                                success : function(res){
                                    if(res.status == 0){
                                        $.cpk_alert(res.msg);
                                    } else {
                                        location.reload();
                                    }
                                }
                            });
                        }
                    });
                });
            }

            function onMonthOver(){

                o_document.on("click",".J_month_over",function(){
                    var taskid = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/monthOver',
                        type : "POST",
                        dataType : "json",
                        data  :{taskid:taskid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_paytoweike_box', title:"包月结算", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            }else{
                                btn.trigger("failed",[res.msg]);
                            }
                        }
                    });
                });
            }
            function onSeeFireInfoBtn(){

                o_document.on("click","#J_see_fireinfo",function(){
                     var taskid = $(this).attr("rel");
                     $.ajax({
                      url : '/dialog/fireWitkey',
                      type : "POST",
                      dataType : "json",
                      data  :{taskid:taskid,step:"seeform",is_require_new:1},
                      success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'alert_paytoweike_box', title:"解雇说明", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'600px'});
                            }else{
                                $.cpk_alert(res.msg);
                            }
                      }
                     });
                });
            }
            function onEditTasksonBtn(){

                onPostEditTasksonBtn();

                o_document.on("click",".J_need_edit_taskson",function(){
                    var tasksonid = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/edit_taskson',
                        type : "POST",
                        dataType : "json",
                        data  :{tasksonid:tasksonid,step:"getform",is_require_new:1},
                        success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'monthtask_edittaskson_form', title:"修改任务", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'710px'});
                                onTasksonKindeditorFormLoad();
                                onShowTasksonUploadifyBtn();
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onPostEditTasksonBtn(){

                o_document.on("click",".J_post_edittaskson",function(){
                    var taskid = $("input[name=taskid]").val();
                    var q_info = $("textarea[name=q_info]").val();
                    var fileid = $("input[name=fileid]").val();
                    var title  = $("input[name=title]").val();
                    var tasksonid = $("input[name=tasksonid]").val();
                    if(title==""){
                        $.cpk_alert("标题不能为空");
                    }
                    if(q_info==""){
                        $.cpk_alert("内容不能为空");
                    }
                    if(tasksonid==""){
                        $.cpk_alert("错误的子任务id");
                    }
                    $.ajax({
                        url : '/dialog/edit_taskson',
                        type : "POST",
                        dataType : "json",
                        data : {tasksonid:tasksonid,taskid:taskid,step:"saveform","q_info":q_info,fileid:fileid,title:title},
                        success : function(res){
                            if(res.status == 1){
                                $.cpk_alert_reload(res.msg);
                                $.dialog.get('monthtask_edittaskson_form').close();
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }
            function onEditRetaskSonBtn(){

                sendEditRetaskBid();

                o_document.on("click",".J_need_edit_retaskson",function(){

                    var bid_id = $(this).attr("rel");
                    $.ajax({
                        url : '/dialog/edit_retaskson_bid',
                        type : "POST",
                        dataType : "json",
                        data  :{bid_id:bid_id,step:"getform"},
                        success : function(res){
                            if(res.status==1){
                                var info_temp = res.data;
                                $.dialog({id:'monthtask_editretaskson_bid_form', title:"修改稿件", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'710px'});
                                onTasksonKindeditorFormLoad();
                                onShowTasksonUploadifyBtn();
                            }else{
                                $.cpk_alert_reload(res.msg);
                            }
                        }
                    });
                });
            }
            function sendEditRetaskBid(){

                o_document.on("click",".J_editreaskson_submit",function(){
                    var q_info = $('textarea[name="q_info"]').val();
                    var fileid = $('input[name=fileid]').val();
                    var tasksonid = $('input[name=tasksonid]').val();
                    var bid_id    = $('input[name=bid_id]').val();
                    if(q_info==""){
                        $.cpk_alert("内容不能为空");
                    }else{
                        $.ajax({
                            url : "/dialog/edit_retaskson_bid",
                            type : 'POST',
                            dataType : 'json',
                            data : {bid_id:bid_id,q_info:q_info, fileid:fileid,tasksonid:tasksonid, step:"saveform"},
                            success : function(result){
                                if(result.status == 1){
                                    $.cpk_alert_reload('提交成功');
                                    $.dialog.get('monthtask_editretaskson_bid_form').close();
                                } else {
                                    $.cpk_alert_reload(result.msg);
                                }
                            }
                        }); 
                    }

                });
            }

            function onNotPassReasonAlertBtn(){
                o_document.on("click",".J_alert_info",function(){
                    var info_temp = $(this).attr("data-info");
                    info_temp = info_temp.replace(/\r\n/g,"<BR>")  
                    info_temp = info_temp.replace(/\n/g,"<BR>"); 

                    info_temp = alertStr(info_temp, 'close');
                    $.dialog({id:'alert_info_box', title:"未通过说明", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'500px'});
                });
            }
            function alertStr(str, classStr){
                var resstr = '<div id="tinfo">';
                resstr += '<div class="padding_20">';
                resstr += '<p style="font-size: 14px;">'+str+'</p>';
                resstr += '</div>';
                resstr += '<div class="btnbox" style="margin:20px auto;text-align: center;">';
                resstr += '<a href="javascript:" class="btn-blue '+classStr+'" style="margin:auto;display:inline;padding:7px 10px;">确定</a>';
                resstr += '</div>';
                resstr += '</div><div class="clear"></div>';
                return resstr;
            }
            return obj;
        }
    }





    return CPK_monthtaskdetail;
});
