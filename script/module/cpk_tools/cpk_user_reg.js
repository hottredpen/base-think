define(['jquery'],function($){
    var CPK_user_reg = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var usernameisok    = false;
            var passwordisok    = false;
            var repasswordisok  = false;
            var verifyisok      = false;
            var phoneisok       = false;
            var emailisok       = false;

            var username_deferred;
            var phone_deferred;
            var email_deferred;

            obj.init = function(){
                onEveryBlur();
                onRegBtn();
            }
            function onEveryBlur(){
                $('input[name=phone]').on("failed",function(e,msg){
                    $('.err_phone').html(msg);
                    $('.err_phone').show();
                    phoneisok = false;
                    phone_deferred.resolve(false);
                });

                $('input[name=phone]').on("isok",function(e,msg){
                    $('.err_phone').html("");
                    $('.err_phone').hide();
                    phoneisok = true;
                    phone_deferred.resolve(true);
                });

                $('input[name=username]').blur(function(){
                    var val = $(this).val();
                    chkusername(val);
                });
                $('input[name=username]').on("failed",function(e,msg){
                    $('.err_username').html(msg);
                    $('.err_username').show();
                    usernameisok = false;
                    username_deferred.resolve(false);
                });
                $('input[name=username]').on("isok",function(e,msg){
                    $('.err_username').html("");
                    $('.err_username').hide();
                    usernameisok = true;
                    username_deferred.resolve(true);
                });
                //password
                $('input[name=password]').blur(function(){
                    var val = $(this).val();
                    chkpassword(val);
                });
                $('input[name=password]').on("failed",function(e,msg){
                    $('.err_password').html(msg);
                    $('.err_password').show();
                    passwordisok = false;
                });
                $('input[name=password]').on("isok",function(e,msg){
                    $('.err_password').html("");
                    $('.err_password').hide();
                    passwordisok = true;
                });
                //repassword
                $('input[name=repassword]').blur(function(){
                    var val = $(this).val();
                    chkrepassword(val);
                });
                $('input[name=repassword]').on("failed",function(e,msg){
                    $('.err_repassword').html(msg);
                    $('.err_repassword').show();
                    repasswordisok = false;
                });
                $('input[name=repassword]').on("isok",function(e,msg){
                    $('.err_repassword').html("");
                    $('.err_repassword').hide();
                    repasswordisok = true;
                });

                $('input[name=captcha]').on("failed",function(e,msg){
                    $('.err_verify').html(msg);
                    $('.err_verify').show();
                    verifyisok = false;
                });

                $('input[name=captcha]').on("isok",function(e,msg){
                    $('.err_verify').html("");
                    $('.err_verify').hide();
                    verifyisok = true;
                });

                $('input[name=captcha]').on("blur",function(e,msg){
                    checkedVerify();
                });


                $('input[name=phone]').blur(function(){
                    var val = $(this).val();
                    chkphone(val);
                });

            //email
                $('input[name=email]').blur(function(){
                    var val = $(this).val();
                    chkemail(val);
                });
                $('input[name=email]').on("failed",function(e,msg){
                    $('.err_for_email').html(msg);
                    $('.err_for_email').show();
                    emailisok = false;
                    email_deferred.resolve(false);
                });
                $('input[name=email]').on("isok",function(e,msg){
                    $('.err_for_email').html("");
                    $('.err_for_email').hide();
                    emailisok = true;
                    email_deferred.resolve(true);
                });
            }

            function onRegBtn(){
                $('#J_regBtn').click(function(){
                    var username    = $('input[name=username]').val();
                    var password    = $('input[name=password]').val();
                    var repassword  = $('input[name=repassword]').val();
                    var phone       = $('input[name=phone]').val();
                    var email       = $('input[name=email]').val();
                    
                    chkusername(username);
                    chkpassword(password);
                    chkrepassword(repassword);
                    chkphone(phone);
                    chkemail(email);
                    checkedVerify();

                    var accpet = $('#acceptcheck').attr("checked");
                    if(accpet==null){
                        $.cpk_alert("请阅读并接受《注册协议和版权声明》 ");
                        return false;
                    }

                    $.when(username_deferred.promise(),phone_deferred.promise(),email_deferred.promise())
                        .done(function(username_istrue,phone_istrue,email_istrue){
                            if(username_istrue && phone_istrue && email_istrue){
                                usernameisok   = true;
                                phoneisok      = true;
                                emailisok      = true;
                                ajaxpostReg();
                            }
                    });


                });
            }

            function ajaxpostReg(){
                if(usernameisok && passwordisok && repasswordisok && phoneisok && emailisok && verifyisok){
                    $("#j_register_frm").submit();
                }
            }

            //计算中英文混合字符串长度
            function countCharacters(str){
                var totalCount = 0; 
                for (var i=0; i<str.length; i++) { 
                    var c = str.charCodeAt(i); 
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
                         totalCount++; 
                     }else {     
                         totalCount+=2; 
                     } 
                }
                return totalCount;
            }
            //计算字符串中汉字长度
            function countChineseCharacterLen(str){
                var totalCount = 0; 
                for (var i=0; i<str.length; i++) { 
                    var c = str.charCodeAt(i); 
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {

                    }else{     
                         totalCount++; 
                    } 
                }
                return totalCount;
            }

            //计算字符窜中英文字符长度
            function countEnglishCharacterLen(str){
                var totalCount = 0; 
                for (var i=0; i<str.length; i++) { 
                    var c = str.charCodeAt(i); 
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                         totalCount++; 
                    } 
                }
                return totalCount;
            }
            /**
             * 用户名检查
             * @param  {[type]} username [description]
             * @return {[type]}          [description]
             */
            function chkusername(username){
                username_deferred = $.Deferred();

                if(username == '' ||　username == '填写用户名'){
                    $('input[name=username]').trigger("failed",['请输入用户名']);
                } else {
                    var pattern = /^[\w\u4e00-\u9fa5]+$/;
                    var usernametest= pattern.test(username);
                    if(!usernametest){
                        $('input[name=username]').trigger("failed",['包含非法字符']);
                        return;  
                    }
                    if(countCharacters(username)<4){
                        $('input[name=username]').trigger("failed",['至少需要4个字符']);
                        return;  
                    }
                    if(countCharacters(username)>16){
                        $('input[name=username]').trigger("failed",['不超过16个字符']);
                        return;  
                    }
                    $.ajax({
                        url : "/api/users/chkusername",
                        type : "POST",
                        dataType : "json",
                        data : {username:username},
                        success : function(res){
                            setTimeout(function(){
                                if(res.status == 0){
                                    $('input[name=username]').trigger("failed",[res.msg]);
                                } else {
                                    $('input[name=username]').trigger("isok",[res.msg]);
                                }
                            },0);
                        }
                    });
                }
            }
            /**
             * 检查密码
             * @param  {[type]} password [description]
             * @return {[type]}          [description]
             */
            function chkpassword(password){
                if(password == ''){
                    $('input[name=password]').trigger("failed",['请输入密码']);
                } else {
                    var repassword = $('input[name=repassword]').val();
                    if(repassword !='' && password!=repassword){
                        $('input[name=password]').trigger("failed",['两次输入密码不一致']);
                    } else {
                        var passwordlength =password.length;
                        if(passwordlength<6 || passwordlength>20){
                            $('input[name=password]').trigger("failed",['密码长度要在6-20之间']);
                        }else{
                            $('input[name=password]').trigger("isok",['ok']);
                        }
                    }
                }
            }
            /**
             * 检查确认密码
             * @param  {[type]} repassword [description]
             * @return {[type]}            [description]
             */
            function chkrepassword(repassword){
                if(repassword == ''){
                    $('input[name=repassword]').trigger("failed",['请再次输入密码']);
                } else {
                    var password = $('input[name=password]').val();
                    if(repassword != password){
                        $('input[name=repassword]').trigger("failed",['两次输入密码不一致']);
                    } else {
                        $('input[name=repassword]').trigger("isok",['ok']);
                    }
                }
            }

            //检查验证码
            function checkedVerify(){
                var value = $('input[name=captcha]').val();
                if(value==""){
                    $('input[name=captcha]').trigger("failed", "验证码不能为空");
                    return;
                }

                $.ajax( {
                    url  : '/captcha/captchaCode',
                    type :'post',
                    cache:false,
                    dataType:'json',
                    data : {"captcha":value},
                    success:function(data) {
                        if(data.status==1){
                            $('input[name=captcha]').trigger("isok","验证码正确");
                        }else{
                            $('input[name=captcha]').trigger("failed", "验证码不正确");
                        }
                    },
                    error : function() {}
                });
            }

            function chkphone(phone){
                phone_deferred = $.Deferred();

                if(phone == '' || phone=='填写有效手机号码'){
                    $('input[name=phone]').trigger("failed",["请输入手机号码"]);
                } else {
                    var pat = /^1[3|4|5|7|8]\d{9}$/;
                    var flag = pat.test(phone);
                    if(flag){

                        $.ajax({
                            url : "/api/users/chkphone",
                            type : "POST",
                            dataType : "json",
                            data : {phone : phone},
                            success : function(res){
                                setTimeout(function(){
                                    if(res.status == 1){
                                        $('input[name=phone]').trigger("isok",[res.msg]);
                                    } else {
                                        $('input[name=phone]').trigger("failed",[res.msg]);
                                    }
                                },0);
                            }
                        });
                    } else {
                        $('input[name=phone]').trigger("failed",["手机号码格式错误"]);
                    }
                } 
            }

            /**
             * 检查邮件
             * @param  {[type]} email [description]
             * @return {[type]}       [description]
             */
            function chkemail(email){
                email_deferred = $.Deferred();

                if(email == "" || email == "填写有效的邮箱地址"){
                    $('input[name=email]').trigger("isok",["ok"]);
                }else{
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    var flag = myreg.test(email);
                    if(!flag){
                        $('input[name=email]').trigger("failed",["邮箱格式不正确"]);
                    } else {
                        $.ajax({
                            url : "/api/users/chkemail",
                            type : "POST",
                            dataType : "json",
                            data : {email:email},
                            success : function(res){
                                setTimeout(function(){
                                    if(res.status == 0){
                                        $('input[name=email]').trigger("failed",[res.msg]);
                                    } else {
                                        $('input[name=email]').trigger("isok",[res.msg]);
                                    }
                                },0);
                            }
                        });
                    }
                }
            }
            return obj;
        }
    }
    return CPK_user_reg;
});
