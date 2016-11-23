define(['jquery'],function($){
    var CPK_user_needchkphone = {
        createObj : function(){
            var phoneBind = {};
            var phoneNumber = "";
            var phoneAvailable = false;
            var isverifyCodeSend = false;
            var remainderTimer = 0;
            var setIntervalTimer = null;
            var callBack = null;

            var phone_is_chked = 0;

            var _has_init = 0;

            phoneBind.init= function(_callBack){
                _has_init = 1;
                _init_append_html();
                isverifyCodeSend = true;
                callBack = _callBack;
                openCheckPhoneWin();
                onCloseBtn();
            }

            phoneBind.is_init = function(){
                return _has_init;
            }



            phoneBind.openBindPhoneDialog = function(){
                setPhone();
                setMaskSize();
                setBindPhoneDialogViewShowOut("#phone-mask");
                setBindPhoneDialogViewShowOut("#phone-bind-dailog");
                setDialogPosition("#phone-bind-dailog");
                $("input[name=phone-number]").focus();
            }

            phoneBind.getPhoneCheckedStatus = function(){
                return phone_is_chked;
            }

            function _init_append_html(){
                $('body').append(_get_this_html());
            }
            function _get_this_html(){
                return '<div id="phone-mask" class="phone-mask hidden"></div>\
                        <div class="phone-verify-win hidden" id="phone-bind-dailog">\
                           <div class="phone-content">\
                              <div class="phone-title" style="position: relative;">\
                                 <h3>手机绑定</h3>\
                                 <a id="j_can_close_phone_box" class="J_close_phone_box mr_20 hidden " href="javascript:;" style="position: absolute;top:0px;right: 0px;">x</a>\
                              </div>\
                              <div class="phone-container">\
                                 <ul>\
                                 <li><label>绑定手机号：</label><span type="text" class="phone-span phone-number"><cite></cite><input type="text" name="phone-number" class="phone-input phone-input-number" placeholder="输入您的手机号码"></span><span class="phone-error hidden J_phone-error"></span></li>\
                                 <li><label>输入验证码：</label><span type="text" class="phone-span phone-verify"><cite></cite><input type="text" name="phone-verify" class="phone-input phone-input-verify J_phone-input-verify" placeholder="填写手机验证码"></span><a href="javascript:void(0);" class="phone-verify-btn">发送验证码</a><span class="phone-error J_request_error hidden"></span></li>\
                                 <li><label></label><a href="javascript:void(0);" class="phone-btn J_bind_btn">立即绑定</a><span class="submit-error hidden"></span></li>\
                                 </ul>\
                              </div>\
                           </div>\
                        </div>';
            }

            function onCloseBtn(){

                $(document).on("click","#j_can_close_phone_box",function(){
                    closeBindPhoneDailog();
                });
            }

            function openCheckPhoneWin(){
               $.ajax({
                      url : "/home/mobile/getcheckPhoneStatus",
                      type : 'POST',
                      dataType : 'json',
                      success : function(result){
                         if(result.status == 1){
                            var data = result;
                            if(data.data[0]["phonechk"] == 0){
                                var username = data.data[0]['username'];
                                var phone = data.data[0]["phone"];
                                var _phone = "";
                                if(checkPhoneFromat(username)) _phone = username;
                                if(checkPhoneFromat(phone)) _phone = phone;
                                phoneNumber = _phone;
                                phoneBind.openBindPhoneDialog();
                                getRemainderTime();
                            }else{
                                phone_is_chked = 1;
                            }
                            if(typeof callBack != "undefined"){
                                callBack();
                            }
                        }else if(result.status==-1){
                            phone_is_chked = -1;
                            if(typeof callBack != "undefined"){
                                callBack();
                            }
                        }
                      }
                   }); 
            }

            function setPhone(){
                if(typeof phoneNumber == 'string'){
                    $("input[name=phone-number]").val(phoneNumber);
                }
            }

            function addEvent(){
                $(".phone-close-btn").live("click", function(){
                    closeBindPhoneDailog();
                });

                $(".J_bind_btn").live("click", function(){
                    bindPhone();
                });

                $(".phone-verify-btn").live("click", function(){
                    requestPhoneVerify();
                });

                $(".phone-input-number").live("blur", function(){
                    checkPhoneHandle();
                });

                $(window).resize(function(){
                    setMaskSize();
                    setDialogPosition("#phone-bind-dailog");
                });
            }

            function setMaskSize(){
                $("#phone-mask").css({"height":document.body.scrollHeight});
                $("#phone-mask").css({"width":document.body.scrollWidth});
            }

            function getRemainderTime(){
                //请求服务器，获取当前剩余时间。
                $.ajax({
                        url : '/mobile/getMobileCodetime',
                        type : "POST",
                        dataType : "json",
                        data : {phone:phoneNumber},
                        success : function(res){
                            if(res.status == 1){
                                var data = res.data;
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
                            addEvent();
                        }
                    });
            }

            function closeBindPhoneDailog(){
                setBindPhoneDialogViewShowIn("#phone-mask");
                setBindPhoneDialogViewShowIn("#phone-bind-dailog");
                clearFormInput();
            }

            function clearFormInput(){
                $("input[name=phone-number]").val("");
                $("input[name=phone-verify]").val("");
            }

            function bindPhone(){
                if(isBindAvailable()){
                    var phoneVerify = $("input[name=phone-verify]").val();
                    $.ajax({
                        url : '/mobile/mobileVerify',
                        type : "POST",
                        dataType : "json",
                        data : {verifyCode:phoneVerify, phone:phoneNumber},
                        success : function(res){
                            if(res.status == 1){
                                $.cpk_alert_reload("恭喜！绑定成功！");
                                phone_is_chked = 1;
                                $(document).trigger("cpk_phonebox_bind_ok");
                                closeBindPhoneDailog();
                                if(callBack) callBack(phoneNumber);
                            } else {
                                bindPhoneErrorInfoShowOut(".submit-error", res.msg);
                            }
                        }
                    });
                }
            }

            //请求发送验证码。  
            function requestPhoneVerify(){
                if(phoneAvailable && !isverifyCodeSend){
                    $(".phone-verify-btn").html("正在发送...");
                    isverifyCodeSend = true;
                    $.ajax({
                        url : '/mobile/phonechk',
                        type : "POST",
                        dataType : "json",
                        data : {phone:phoneNumber},
                        success : function(res){
                            if(res.status == 1){
                                bindPhoneErrorInfoShowIn(".submit-error", res.msg);
                                remainderTimer = 120;
                                timer();
                            } else {
                                bindPhoneErrorInfoShowOut(".submit-error", res.msg);
                                isverifyCodeSend = false;
                            }
                        }
                    });
                }
            }

            function isBindAvailable(){
                var verify = $("input[name=phone-verify]").val();
                if(verify != "" && phoneNumber!="" && phoneAvailable){
                    return true;
                }
                return false ;
            }

            function checkPhoneHandle(){
                phoneNumber = $("input[name=phone-number]").val();
                checkPhone(phoneNumber);
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

            /**
             * 检查手机号
             * @param  {[type]} phone [description]
             * @return {[type]}       [description]
             */
            function checkPhone(phone){
                var error_msg = "手机格式错误";
                if(checkPhoneFromat(phone)){
                    $.ajax({
                        url : "/api/users/chkphone",
                        type : "POST",
                        dataType : "json",
                        data : {phone : phone},
                        success : function(res){
                            if(res.status == 1){
                                bindPhoneSuccseInfoShowOut(".J_phone-error", res.msg);
                                phoneAvailable = true;
                            } else {
                                bindPhoneErrorInfoShowOut(".J_phone-error", res.msg);
                                phoneAvailable = false;
                            }
                        }
                    });
                } else if(phone != "") {
                    bindPhoneErrorInfoShowOut(".J_phone-error", error_msg);
                    phoneAvailable = false;
                }
            }

            function checkPhoneFromat(_phone){
                var pat =  /^1[3|4|5|7|8]\d{9}$/;
                return pat.test(_phone);
            }

            function bindPhoneErrorInfoShowOut(id, msg){
                $(id).html(msg);
                $(id).removeClass("hidden");
                $(id).removeClass("phone-succse");
            }

            function bindPhoneSuccseInfoShowOut(id, msg){
                $(id).html(msg);
                $(id).addClass("phone-succse");
            }

            function bindPhoneErrorInfoShowIn(id){
                $(id).addClass("hidden");
            }
            return phoneBind;
        }
    }
    return CPK_user_needchkphone;
});
