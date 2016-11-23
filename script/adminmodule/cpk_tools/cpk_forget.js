define(['jquery'],function($){
    var CPK_forget = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var findTypename = "phone";

            var phoneWaitTime = 120;
            var emailWaitTime = 60;
            var waitTime;
            var isSending_email = false;
            var isSending_phone = false;
            var isPosting = false;

            var findtypetitleId      = "#j_findtypevalue_title";
            var findtypecodetitleId  = "#j_findtypecode_title";

            var o_findValueInput  = $("input[name=findvalue]");

            var phonechkstatus = true;
            var emailchkstatus = true;

            var captcha_isok  = false;
            var phone_isok    = false;
            var email_isok    = false;
            var code_isok     = false;

            var email_time;
            var phone_time;

            obj.init = function(){
                if($(".J_forgetfind_type").length>0){
                    o_findValueInput.val("");
                    onPhoneEmailChange();
                    onCaptchaChange();
                    onGetCode();
                    onForgetValueBlur();
                    onCaptchaBlur();

                    onPostForm();
                }

            }
            function onCaptchaBlur(){

                o_document.on("blur","input[name=findcaptcha]",function(){
                    var o_val = $(this).val();

                    $.ajax({
                        url : "/captcha/captchaCode",
                        type : "POST",
                        dataType : "json",
                        data : {captcha:o_val},
                        success : function(res){
                            if(res.status == 0){
                                $('.j_err_findcaptcha').html("图形验证码不正确").show();
                                captcha_isok = false;
                            }else{
                                $('.j_err_findcaptcha').html("").hide();
                                captcha_isok = true;
                            }
                        }
                    });
                });
            }

            function onPhoneEmailChange(){

                o_document.on("click",".J_forgetfind_type",function(){
                    var o_type_title   = $(findtypetitleId);
                    var o_code_title   = $(findtypecodetitleId);
                    var o_this         = $(this);
                    var thisValue      = o_findValueInput.val();
                    var getChangeValue = o_this.attr("data-value");
                    
                    findTypename    = o_this.attr("data-type");
                    $(".J_forgetfind_type").removeClass("select");
                    o_this.addClass("select");

                    if(findTypename=="email"){
                        o_type_title.html("Email：").attr("data-othervalue",thisValue);
                        o_findValueInput.val(getChangeValue);
                        o_code_title.html("邮箱验证码：");
                        $('.j_err_findtypevalue').html('');
                        $("input[name=findtype]").val("email");
                        $("#j_code_text").html("获取验证码");
                        o_this.attr("data-value",getChangeValue);
                    }else{
                        o_type_title.html("手机号：").attr("data-othervalue",thisValue);
                        o_findValueInput.val(getChangeValue);
                        o_code_title.html("手机验证码：");
                        $('.j_err_findtypevalue').html('');
                        $("input[name=findtype]").val("phone");
                        $("#j_code_text").html("获取验证码");
                        o_this.attr("data-value",getChangeValue);
                    }
                });
            }

            function onCaptchaChange(){
                o_document.on("click",".J_captcha_change",function(){
                    var d = new Date();
                    $("#j_forget_captcha").attr("src","/captcha/index/?t="+d.getTime());
                });
            }

            function onGetCode(){
                o_document.on("click",".J_forget_getCode",function(){
                    checkInputValue();
                    if(findTypename=="email"){
                        if(emailchkstatus && isSending_email===false){
                            email_time = emailWaitTime;
                            sendEmailForGetCode();
                        }
                    }else{
                        if(phonechkstatus && isSending_phone===false){
                            phone_time = phoneWaitTime;
                            sendSMSForGetCode();
                        }
                    }
                });
            }

            function sendEmailForGetCode(){
                var email = o_findValueInput.val();
                $("#j_code_text").text("发送中...");
                $.ajax({
                    url : "/forget/sendForgetEmail",
                    type : "POST",
                    dataType : "json",
                    data : {email:email},
                    success : function(res){
                        if(res.status == 0){
                            $.cpk_alert(res.msg);
                            $("#j_code_text").text("获取验证码");
                        }else{
                            emailtimeChange();
                        }
                    }
                });
            }

            function sendSMSForGetCode(){
                var phone = o_findValueInput.val();
                $("#j_code_text").text("发送中...");
                $.ajax({
                    url : "/mobile/forgetpassword",
                    type : "POST",
                    dataType : "json",
                    data : {mobile:phone},
                    success : function(res){
                        if(res.status == 0){
                            $.cpk_alert(res.msg);
                            $("#j_code_text").text("获取验证码");
                        }else{
                            phonetimeChange();
                        }
                    }
                });
            }
            function emailtimeChange(){
            
                if(email_time==0){
                    $("#j_code_text").text("重新发送");
                    isSending_email = false;
                }else{
                    email_time--;
                    isSending_email = true;
                    if(findTypename=="email"){
                        $("#j_code_text").text(email_time+ "秒后可重新发送");
                    }
                    setTimeout(function() {
                        emailtimeChange();
                    },1000);
                }
            
            }

            function phonetimeChange(){
                if(phone_time==0){
                    $("#j_code_text").text("重新发送");
                    isSending_phone = false;
                }else{
                    phone_time--;
                    isSending_phone = true;
                    if(findTypename=="phone"){
                        $("#j_code_text").text(phone_time+ "秒后可重新发送");
                    }
                    setTimeout(function() {
                        phonetimeChange();
                    },1000);
                }
            }

            function onForgetValueBlur(){
                o_findValueInput.blur(function(){
                    checkInputValue();
                });
            }

            function checkInputValue(){
                var val = o_findValueInput.val();
                if(findTypename=="email"){
                    $("#j_select_findtype_email").attr("data-value",val);
                    chkemail(val);
                }else{
                    $("#j_select_findtype_phone").attr("data-value",val);
                    chkphone(val);
                }
            }

            function chkphone(phone){
                if(phone == ''){
                    $('.j_err_findtypevalue').html('请输入手机号码').show();
                    phonechkstatus = false;
                } else {
                    var pat = /^1[3|4|5|7|8]\d{9}$/;
                    var flag = pat.test(phone);
                    if(flag){
                        checkPhoneExist(phone);
                    } else {
                        $('.j_err_findtypevalue').html('手机号码格式错误').show();
                        phonechkstatus = false;
                    }
                }
            }

            function checkPhoneExist (phone){
                $.ajax({
                    url:'/help/checkPhoneExist',
                    type:'post',
                    data:{
                        "phone":phone
                    },
                    cache:false,
                    dataType:'json',
                    success:function(res) {
                        if(res.status ==1 ){
                            $('.j_err_findtypevalue').html("").hide();
                            phonechkstatus = true;
                        }else{
                            $('.j_err_findtypevalue').html(res.data).show();
                            phonechkstatus = false;
                        }
                    }
                });
            }

            function chkemail(email){
                if(email == ''){
                    $('.j_err_findtypevalue').html('请输入邮件地址').show();
                    emailchkstatus = false;
                } else {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    var flag = myreg.test(email);
                    if(flag){
                        $('.j_err_findtypevalue').html('').hide();
                        emailchkstatus = true;
                    } else {
                        $('.j_err_findtypevalue').html('邮件地址格式错误').show();
                        emailchkstatus = false;
                    }
                }
            }


            function onPostForm(){

                o_document.on("click",".J_post_forgetform",function(){
                    
                    var findtype    = findTypename;
                    var findvalue   = o_findValueInput.val();
                    var findcaptcha = $("input[name=findcaptcha]").val();
                    var findcode    = $("input[name=findcode]").val();






                    if(findvalue==""){
                        $('.j_err_findtypevalue').html('不能为空').show();
                        if(findTypename=="email"){
                            email_isok = false;
                        }else{
                            phone_isok = false;
                        }
                    }else{
                        if(findTypename=="email"){
                            chkemail(findvalue);
                        }else{
                            chkphone(findvalue);
                        }
                    }

                    if(findcode==""){
                        $('.j_err_findcode').html('不能为空').show();
                        code_isok = false;
                    }else{
                        $('.j_err_findcode').html('').hide();
                        code_isok = true;
                    }

                    if(captcha_isok===false){
                        $('.j_err_findcaptcha').html("图形验证码不正确").show();
                    }else{
                        $('.j_err_findcaptcha').html("").hide();
                    }


                    if(findTypename=="email" && emailchkstatus===false){
                        email_isok = false;
                    }else{
                        email_isok = true;
                    }
                    if(findTypename=="phone" && phonechkstatus===false){
                        phone_isok = false;
                    }else{
                        phone_isok = true;
                    }



                    if(email_isok && phone_isok && code_isok && captcha_isok){
                        $("#fpassword_from").submit();
                    }
                    
                });




            }

            return obj;
        }
    }
    return CPK_forget;
});
