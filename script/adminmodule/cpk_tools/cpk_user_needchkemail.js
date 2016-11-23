define(['jquery'],function($){
    var CPK_user_needchkemail = {
        createObj : function(){
            var obj = {};
            var callBack = null;
            var o_document = $(document);

            var email_is_chked = 0;
            var emailvalue;
            var wait = 60;
            var email_isok = false;

            obj.init= function(_callBack){
                _init_append_html();
                _init_email_value();
                obj.openBindEmailDialog();
                onCloseBtn();
                _callBack();


                onEveryBlur();

                o_document.on("click",".J_email_verify_send",function(){
                    sendVerifyCode($(this));
                });


                o_document.on("sending_email",function(e,email){
                    sendVerifyCodeTrigger(email);
                });


                o_document.on("emailSendOk",function(e,msg){
                    time_email('.J_email_verify_send');
                });


                o_document.on("emailSendFailed",function(e,msg){
                    $(".J_email_verify_send").text("发送验证码");
                    tipsShow(false, "j_email_error_tip", msg,"email_isok");
                });

                o_document.on("click",".J_bind_email_btn",function(){
                    var emailCode = $('input[name=email_verify]').val();
                    if(emailCode==""){
                        $('.err_email').html("请填写验证码");
                        $('.err_email').show();
                        return;
                    }
                    ajaxPost("/user/vifityEmail", {emailCode:emailCode}, function(res){
                        if(res.status==1){
                            closeBindEmailDailog();
                            $.cpk_alert_reload(res.msg);
                        }else{
                            $.cpk_alert(res.msg);
                        }
                        
                    });
                });


            }
            function onEveryBlur(){
                o_document.on("blur",'input[name=email_value]',function(e,email){
                    checkemailvalue();
                });
            }
            function checkemailvalue(){
                var email = $('input[name=email_value]').val();
                if(email==""){
                    tipsShow(false, "j_email_error_tip", "邮箱不能为空！","email_isok");
                    return;
                }
                if(!checkEmailFormat(email)){
                    tipsShow(false, "j_email_error_tip", "邮箱格式错误！","email_isok");
                    return;
                }
                tipsShow(true, "j_email_error_tip", "","email_isok");
            }

            function sendVerifyCodeTrigger(email){
                if(wait==60){
                    ajaxPost("/user/sendMail", {email:email}, sendVerifyCodeRequestData);
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
                        time_email('.J_email_verify_send')
                    },1000);
               }
            }
            function sendVerifyCodeRequestData(data){
                if(data.status==1){
                    o_document.trigger("emailSendOk",[data.msg]);
                }else{
                    o_document.trigger("emailSendFailed",[data.msg]);
                }
            }
            function tipsShow(checkValue, tipsElement, tipsMsg,eleStatus){

                if(!checkValue){
                    eval(eleStatus+"=false;");
                    $("#"+tipsElement).html(tipsMsg);
                    $("#"+tipsElement).removeClass('hidden');
                }else{
                    eval(eleStatus+"=true;");
                    $("#"+tipsElement).addClass('hidden');
                }
            }
            obj.openBindEmailDialog = function(){
                setMaskSize();
                setBindEmailDialogViewShowOut("#email-mask");
                setBindEmailDialogViewShowOut("#email-bind-dailog");
                setDialogPosition("#email-bind-dailog");
                $("input[name=email_value]").val(emailvalue).focus();
            }
            function checkEmailFormat(email){
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                return reg.test(email);
            }
            function sendVerifyCode(thisButton){
                var email = $('input[name=email_value]').val();
                if(thisButton.text()=="发送验证码" || thisButton.text()=="重新发送"){
                    if(email_isok){
                        thisButton.text("发送中...");
                        o_document.trigger("sending_email",[email]);
                    }
                }
            }

            function _init_email_value(){
                emailvalue = $('input[name=email]').val();
            }
            function onCloseBtn(){

                $(document).on("click","#j_can_close_email_box",function(){
                    closeBindEmailDailog();
                });
            }

            function _init_append_html(){
                $('body').append(_get_this_html());
            }

            function _get_this_html(){
                return '<div id="email-mask" class="email-mask hidden"></div>\
                        <div class="email-verify-win hidden" id="email-bind-dailog">\
                           <div class="email-content">\
                              <div class="email-title" style="position: relative;">\
                                 <h3>邮箱绑定</h3>\
                                 <a id="j_can_close_email_box" class="J_close_email_box mr_20 hidden " href="javascript:;" style="position: absolute;top:0px;right: 0px;">x</a>\
                              </div>\
                              <div class="email-container">\
                                 <ul>\
                                 <li><label>绑定邮箱：</label><span type="text" class="email-span email-number"><cite></cite><input type="text" name="email_value" class="email-input email-input-number" placeholder="输入您的邮箱"></span><span id="j_email_error_tip" class=" email-error err_email J_request_error hidden"></span></li>\
                                 <li><label>输入验证码：</label><span type="text" class="email-span email-verify"><cite></cite><input type="text" name="email_verify" class="email-input email-input-verify J_email-input-verify" placeholder="填写邮箱验证码"></span><a href="javascript:void(0);" class="J_email_verify_send u-emailbox-verify">发送验证码</a></li>\
                                 <li><label></label><a href="javascript:void(0);" class="email-btn J_bind_email_btn">立即绑定</a><span class="submit-error hidden"></span></li>\
                                 </ul>\
                              </div>\
                           </div>\
                        </div>';
            }
            function closeBindEmailDailog(){
                setBindEmailDialogViewShowIn("#email-mask");
                setBindEmailDialogViewShowIn("#email-bind-dailog");
                //clearFormInput();
            }
            function setMaskSize(){
                $("#email-mask").css({"height":document.body.scrollHeight});
                $("#email-mask").css({"width":document.body.scrollWidth});
            }
            function setBindEmailDialogViewShowOut(id){
                $(id).removeClass("hidden");
            }
            function setBindEmailDialogViewShowIn(id){
                $(id).addClass("hidden");
            }
            function setDialogPosition(id){
                var wnd = $(window), doc = $(document);
                var left = doc.scrollLeft();
                var top = doc.scrollTop();
                left += (wnd.width() - $(id).width())/2;
                top += (wnd.height() - $(id).height())/2;
                $(id).css("top",top);
                $(id).css("left",left);
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
            return obj;
        }
    }
    return CPK_user_needchkemail;
});
