define(['jquery'],function($){
    var CPK_user_email = {
        createObj : function(){
            var emailVerify = {};
            var emailMsgElementId = "#email_msg";
            var msgElementId = "#J_msg";
            var sendMailForm = "#form1";
            var verifyFormName = "#verifyForm";
            var verifyCodeElementName = "#J_code";
            var sendMailBtn = ".J_sendMail";
            var emailAddress = "#emailAddress";
            var isCheckRigth = false;
            var wait = 60;

            emailVerify.init = function(){
                initCheckEmail();
                addEvent();
            }

            function initCheckEmail(){
                var email = $(emailAddress).val();
                if(checkEmailFormat(email)){
                    requestCheckFormStatus(email);
                }
            }

            function addEvent(){
                $("input[name=email]").live('blur', function(){
                    checkeEmail();
                });

                $(".J_unbindMail").live("click", function(){
                    unbindMail();
                });

                $(".J_submitVerify").live("click", function(){
                    submitVerify();
                });

                $(".emailrewrite").click(function(){
                     emailReWrite();
                });

                $("#J_send_email_code").click(function(){
                    sendVerifyCode($(this));
                });

                $("#J_send_email_code").live("J_send_email_code",function(e,email){
                    sendVerifyCodeTrigger(email);
                });

                $("#J_send_email_code").live("emailSendOk",function(e,msg){
                    time_email('#J_send_email_code');
                    $.cpk_alert(msg);
                });

                $(sendMailBtn).live("click", function(){
                    emailsubmit();
                });

                $("#J_send_email_code").live("emailSendFailed",function(e,msg){
                    $(this).text("发送到邮箱");
                    $('.err_email').html(msg);
                    $('.err_email').show();
                });
            }

            function checkeEmail(){
                var email = $(emailAddress).val();
                if(checkEmailFormat(email)){
                    requestCheckFormStatus(email);
                }else{
                    showTips("邮箱格式不正确");
                }
            }

            function emailsubmit(){
                var email = $(emailAddress).val();
                if(checkEmailFormat(email)){
                    if(!isCheckRigth) requestCheckFormStatus(email);
                    else
                    $(sendMailForm).submit();
                }
            }

            function requestCheckFormStatus(email){
                ajaxPost("/api/users/chkemail", {email:email}, onLoadData);
            }

            function onLoadData(data){
                if(data.status==0){
                    isCheckRigth = false;
                    showTips(data.msg);
                }else{
                    isCheckRigth = true;
                    hideTips();
                }
            }

            function sendVerifyCodeTrigger(email){
                if(wait==60){
                     ajaxPost("/user/sendMail", {email:email}, sendVerifyCodeRequestData);
                }
            }

            function sendVerifyCodeRequestData(data){
                if(data.status==1){
                  $("#J_send_email_code").trigger("emailSendOk",[data.msg]);
                }else{
                  $("#J_send_email_code").trigger("emailSendFailed",[data.msg]);
                }
            }

            function sendVerifyCode(thisButton){
                var email = $("#emailAddress").val();
                $('.err_email').hide();

                if(!checkEmailFormat(email)){
                  $('.err_email').html("请查看邮箱是否填写正确！");
                  $('.err_email').show();
                }

                if(thisButton.text()=="发送到邮箱" || thisButton.text()=="重新发送" || thisButton.text()=="发送验证码"){
                    thisButton.text("发送中...");
                    thisButton.trigger("J_send_email_code",[email]);
                }
            }

            function submitVerify(){
                var verifCode = $(verifyCodeElementName).val();
                if(verifCode == ""){ $.cpk_alert("请填写验证码"); return;}
                if(isCheckRigth){
                    $(verifyFormName).submit();
                }
            }

            function emailReWrite(){
                ajaxPost("/user/emailsetfail", "", emailReWriteRequestData);
            }

            function emailReWriteRequestData(data){
                if(data.status == 1){
                    window.location.reload();
                }else{
                    $.cpk_alert(res.msg);
                }
            }
        
            function time_email(o){
               if (wait == 0) {
                $(o).text("重新发送");
                wait = 60;
               } else {
                $(o).text(wait + "秒后可重新发送");
                wait--;
                setTimeout(function() {
                    time_email('#J_send_email_code')
                },
                1000);
               }
            }

            function unbindMail(){
                $.cpk_confirm("解除绑定", "您确定要解绑邮箱？解绑后需要重新认证！", unBind);
            }

            function unBind(result){
                if(result == "ok")
                    ajaxPost("/user/unbindMail", "", unbindMailLoadData);
            }

            function unbindMailLoadData(data){
                if(data.status){
                    return reloadPage("/user/email");
                }
                $.cpk_alert(data.msg);
            }

            function reloadPage(url){
                location.href = url;
            }

            function showTips(msg){
               $(emailMsgElementId).show();
               showMsg(msg);
            }

            function hideTips(){
               $(emailMsgElementId).hide();
            }

            function showMsg(msg){
               $(msgElementId).html(msg);
            }
            
            function checkEmailFormat(email){
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                return reg.test(email);
            }

            function ajaxPost(postUrl, postData, callBack){
                var aj = $.ajax({
                url :  postUrl,
                type : 'post',
                cache : false,
                dataType :'json',
                data : postData,
                    success:function(data) {
                      if(callBack!=null) callBack(data);
                    },
                    error : function() {}
                });
            }
            return emailVerify;
        }
    }
    return CPK_user_email;
});
