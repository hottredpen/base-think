require.config({
    baseUrl: "/script/module",//用绝对位置
    shim: {
        'uploadify' : ['jquery'],
        'chat'      : ['jquery']
    },
    paths: {
        'jquery'          : "../../static/cpk/public/js/jquery",
        'uploadify'       : "../../static/cpk/plugins/uploadify/jquery.uploadify",
        'chat'            : "../../static/cpk/public/js/chat_all"
    },
    map: {
        '*': {
            'css': '../../static/cpk/public/js/css'
        }
    }
});
define(['jquery','common','commonTool','uploadify'],function($){
    var o_document = $(document);
    var loginfromdialog = 0;
    var captchafocusNum = 0 ; 

    onLoginBtn();
    onKeyLogin();

    o_document.ready(function(){
        require(["chat"]);
    });


    function onLoginBtn(){
        o_document.on("click","#J_loginBtn",function(){
            checkform();
        });
    }

    function checkform(){
        if($('input[name=username]').val() == '' || $('input[name=password]').val() == ''|| $('input[name=captcha]').val() == ''){
            $.cpk_alert('请填写登录相关信息');
            return false;
        }
        Ajaxsubmit();
    }

    function Ajaxsubmit(){
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        var captcha  = $('input[name=captcha]').val();

        $.ajax({
            url      : "/user/login",
            type     : "POST",
            dataType : "json",
            data     : {username:username,password:password,captcha:captcha},
            success  : function (result){
                if(result.status == 1){
                    window.location.href='/index';
                }else{
                    $.cpk_alert(result.msg);
                }
            }
        });
    }

    function onKeyLogin(){

        o_document.on("dialogloginclick",function(){
            loginfromdialog = 1;
        });

        o_document.on("keydown",function(e){
            o_document.trigger("fromloginpage");
            var keyCode = e.which;
            if (keyCode ==13){
                setTimeout(function(){
                    if(loginfromdialog==1){
                        loginfromdialog = 0;
                    }else{
                        checkform();
                    }
                },200);
            }

        });
    }



});
