define(['jquery'],function($){
    var CPK_contact = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            obj.init = function(){
                onContactBtn();
                onSendContent();
            }
            function onContactBtn(){
                o_document.on("click",".J_contacthe",function(){
                    $('.msg_send_to').die('click');
                    var id = $(this).attr('rel');
                    var step ="getform";
                    $.ajax({
                        url      : "/contact/getContactDialog",
                        type     : "POST",
                        dataType : "json",
                        data     : {uid:id,step:step,is_require_new:1},
                        success  : function (result){
                            if(result.status == 1){
                                var info_temp = result.data;
                                $.dialog({id:'alert_info_box_sendmsg', title:"发送站内信", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
                            }else{
                                if(result.status == -1){
                                    showLoginForm();
                                }else{
                                    $.cpk_alert(result.msg);
                                }
                            }
                        }
                    })
                });
            }
            function onSendContent(){
                    o_document.on("click",".J_msg_send_to",function(){
                        var msg_title   = $('input[name=msg_title]').val();
                        var msg_info    = $('textarea[name=msg_info]').val();
                        var msg_captcha = $('input[name=msg_captcha]').val();
                        var msg_uid     = $('input[name=msg_uid]').val();
                        if(msg_title    == ''){$.cpk_alert('标题必填');return false;}
                        if(msg_info     == ''){$.cpk_alert('联系内容必填');return false;}
                        if(msg_captcha  == ''){$.cpk_alert('验证码必填');return false;}
                        $.ajax({
                            url     : "/contact/send",
                            type    : "POST",
                            dataType: "json",
                            data    : {
                                msg_title   : msg_title, 
                                msg_info    : msg_info, 
                                msg_uid     : msg_uid, 
                                msg_captcha : msg_captcha
                            },
                            success : function(result){
                                if(result.status == 1){
                                    $.cpk_alert('发送成功');
                                    $.dialog.get('alert_info_box_sendmsg').close();
                                    return false;
                                } else {
                                    $.cpk_alert(result.msg);
                                    $("#captchaImg").click();
                                    return false;
                                }
                            }  
                        });
                   });
            }
            return obj;
        }
    }
    return CPK_contact;
});
