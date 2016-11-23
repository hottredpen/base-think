define(['jquery'],function($){
    var CPK_logindialog = {
        createObj : function(){
            var obj = {};
            var o_document  = $(document);
            var fromLoginPage = 0;

            obj.init = function(){
                onKeyDown();
                onSubmitBtn();
            }
            function onKeyDown(){

                o_document.on("keydown",function(event){
                    if($(".J_loginDialog_btn").length>0 && event.keyCode==13){
                        o_document.trigger("dialogloginclick");
                        if(!checkInput()){
                            $.cpk_alert("请填写登录相关信息");
                            return false;
                        }
                        setTimeout(function(){
                            $(".J_loginDialog_btn").trigger("click");
                        },200);
                    }
                });

                o_document.on("fromloginpage",function(){
                    fromLoginPage = 1;
                });

            }
            function onSubmitBtn(){

                o_document.on("click",".J_loginDialog_btn",function(){
                    var username = $("input[name=username]").val();
                    var password = $("input[name=password]").val();
                    var captcha  = $("input[name=captcha]").val();
                    var backurl  = $("input[name=backurl]").val();
                    $.ajax({
                        url : "/home/user/login",
                        type : "POST",
                        dataType : "json",
                        data : {username:username,password:password,captcha:captcha},
                        success : function(res){
                            if(res.status == 1){

                                if(backurl!=""){
                                    location.href=backurl;
                                    return;
                                }
                                if(fromLoginPage==1){
                                    location.href="/index";
                                }else{
                                    window.location.reload();
                                }
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }
            function checkInput(){
                if($("input[name=username]").val()==""){
                    return false;
                }
                if($("input[name=password]").val()==""){
                    return false;
                }
                if($("input[name=captcha]").val()==""){
                    return false;
                }
                return true;
            }
            return obj;
        }
    }
    return CPK_logindialog;
});
