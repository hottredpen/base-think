define(['jquery'],function($){
    var CPK_user_phone = {
        createObj : function(){
            var phoneBind = {};
            var phoneNumber = "";
            var phoneAvailable = false;
            var isverifyCodeSend = false;
            var remainderTimer = 0;
            var setIntervalTimer = null;
            var callBack = null;
            var phoneId = "#phone_number";
            phoneBind.init= function(_callBack){
                if($(".j_userphone_page").length>0 || $(".J_unBindPhone").length>0){
                    isverifyCodeSend = true;
                    checkInitPhoneData();
                    addEvent();
                }
            }

            function checkInitPhoneData(){
                ajaxPost("/mobile/getcheckPhoneStatus", "", openCheckPhoneRequestData);
            }

            function openCheckPhoneRequestData(result){
                if(result.status == 1){
                    var data = result;
                    if(data.data[0]["phonechk"] == 0){
                        var username = data.data[0]['username'];
                        var phone = data.data[0]["phone"];
                        var _phone = "";
                        if(checkPhoneFromat(username)) _phone = username;
                        if(checkPhoneFromat(phone)) _phone = phone;
                        setPhone(_phone);
                        getRemainderTime();
                        checkPhoneHandle();
                    }
                }

            }

            function setPhone(_phone){
                if(typeof _phone == 'string'){
                    $(phoneId).val(_phone);
                    phoneNumber = _phone;
                }
            }

            function addEvent(){
                $(".J_bind_btn").live("click", function(){
                    bindPhone();
                });

                $(".phone-verify-btn").live("click", function(){
                    requestPhoneVerify();
                });

                $(phoneId).live("blur", function(){
                    checkPhoneHandle();
                });

                $(".J_unBindPhone").live("click", function(){
                    unBindPhone();
                });

                $("input[name=phone_code]").live("blur", function(){
                    isBindAvailable();
                });

                $("input[name=captcha]").live("blur", function(){
                    checkcaptchaVerifCode();
                });
            }

            function getRemainderTime(){
                ajaxPost("/mobile/getMobileCodetime", {phone:phoneNumber}, getRemainderTimeRequestData);
            }

            function getRemainderTimeRequestData(result){
                if(result.status == 1){
                    var data = result.data;
                    var timestamp = new Date().getTime();
                    var remainder = Math.floor(timestamp / 1000)-parseInt(data["time"]);
                    setPhone(data['phone']);
                    if(remainder>0 && remainder < 120){
                        isverifyCodeSend = true;
                        remainderTimer = Math.floor(120-remainder);
                        timer();
                    }else{
                        isverifyCodeSend = false;
                    }
                }
                checkPhoneHandle();
            }

            function bindPhone(){
                isBindAvailable();
                checkcaptchaVerifCode();

                if(isBindAvailable() && checkcaptchaVerifCode()){
                    var phoneVerify = $("input[name=phone_code]").val();
                    ajaxPost("/mobile/mobileVerify", {verifyCode:phoneVerify, phone:phoneNumber}, bindPhoneRequestData);
                }
            }

            function checkcaptchaVerifCode(){
                var captcha = $("input[name=captcha]").val();
                if(typeof captcha == "string" && captcha != ""){
                    bindPhoneErrorInfoShowIn(".err_captcha");
                    return true;
                }
                bindPhoneErrorInfoShowOut(".err_captcha", "请填写图形验证码。");
                return false;
            }

            function bindPhoneRequestData(data){
                if(data.status == 1){
                    $.cpk_alert_reload("恭喜！绑定成功！");
                    if(callBack) callBack(phoneNumber);
                } else {
                    $.cpk_alert("绑定失败！请确认验证码正确。");
                    //bindPhoneErrorInfoShowOut(".submit-error", "绑定失败");
                }
            }

            function requestPhoneVerify(){
                if(phoneAvailable && !isverifyCodeSend){
                    $(".phone-verify-btn").html("正在发送...");
                    isverifyCodeSend = true;
                    ajaxPost("/mobile/phonechk", {phone:phoneNumber}, phoneVerifyRequestData);
                }
            }

            function phoneVerifyRequestData(data){
                if(data.status == 1){
                    bindPhoneErrorInfoShowIn(".submit-error", data.msg);
                    remainderTimer = 120;
                    timer();
                } else {
                    bindPhoneErrorInfoShowOut(".submit-error", data.msg);
                    isverifyCodeSend = false;
                }
            }

            function isBindAvailable(){
                var verify = $("input[name=phone_code]").val();
                if(verify != "" && phoneNumber!=""){
                    bindPhoneErrorInfoShowIn(".J_request_error");
                    return true;
                }
                bindPhoneErrorInfoShowOut(".J_request_error", "手机验证码必须填写");
                return false ;
            }


            function checkPhoneHandle(){
                phoneNumber = $(phoneId).val();
                if(checkPhoneFromat(phoneNumber))
                    checkPhone(phoneNumber);
            }

            function setBindPhoneDialogViewShowOut(id){
                $(id).removeClass("hidden");
            }

            function setBindPhoneDialogViewShowIn(id){
                $(id).addClass("hidden");
            }

            function testTimer(){
                remainderTimer = 3;
                timer();
            }

            function timer(){
                clearTimer();
                setIntervalTimer = setInterval(showRemainderTime , 1000);
            }

            function showRemainderTime(){
                remainderTimer--;
                var msg = "";
                if(remainderTimer){
                    msg = remainderTimer + "秒后重发验证码"; 
                }else {
                    phoneAvailable = true;
                    isverifyCodeSend = false;
                    msg = "发送验证码";
                    clearTimer();
                }
                $(".phone-verify-btn").html(msg);
            }

            function clearTimer(){
                if(setIntervalTimer)
                    clearInterval(setIntervalTimer);
            }


            function checkPhone(phone){
                var error_msg = "手机格式错误";
                if(checkPhoneFromat(phone)){
                    ajaxPost("/api/users/chkphone", {phone : phone}, chkphoneRequest);
                } else if(phone != "") {
                    $(".J_phone-error").removeClass("green-less");
                    $(".J_phone-error").addClass("red");
                    bindPhoneErrorInfoShowOut(".J_phone-error", error_msg);
                    phoneAvailable = false;
                }
            }

            function chkphoneRequest(data){
                if(data.status == 1){
                    bindPhoneSuccseInfoShowOut(".J_phone-error", data.msg);
                    phoneAvailable = true;
                } else {
                    bindPhoneErrorInfoShowOut(".J_phone-error", data.msg);
                    phoneAvailable = false;
                }
            }

            function checkPhoneFromat(_phone){
                var pat = /^1[3|4|5|7|8]\d{9}$/;
                return pat.test(_phone);
            }

            function bindPhoneErrorInfoShowOut(id, msg){
                var element = $(id);
                var str = element.html();
                str = str.replace(/<cute>.*<\/cute>/g, '<cute>'+msg+'</cute>');
                element.html(str);
                element.removeClass("hidden");
            }

            function bindPhoneSuccseInfoShowOut(id, msg){
                $(id).addClass("green-less");
                $(id).removeClass("red");
                bindPhoneErrorInfoShowOut(id, msg);
            }

            function bindPhoneErrorInfoShowIn(id){
                $(id).addClass("hidden");
            }

            function unBindPhone(){
                $.cpk_confirm("解除绑定", "您确定要解绑手机？解绑后需要重新认证！", unBind);
            }

            function unBind(result){
                if(result=="ok")
                    ajaxPost("/user/unBindPhone", "", unBindPhoneRequestData);  
            }
              
            function unBindPhoneRequestData(data){
                if(data.status){
                  location.href="/user/phone";
                }else{
                  $.cpk_alert(data.msg);
                }
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

            return phoneBind;
        }
    }
    return CPK_user_phone;
});
