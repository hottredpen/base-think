define(['jquery','./cpk_page_userdata'],function($,CPK_page_userdata){
    var CPK_ChangeTopInfo = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var fontchange = 0;
            var is_username_ok = 0;


            obj.init = function(){
                ajaxChange();
            }
            function msgJump(){
                var msgnum = $("#j_top_msgnum").html();
                if(parseInt(msgnum)>0){
                    msgfontchange();
                }
            }

            function msgfontchange(){
                if(fontchange==0){
                    $("#j_top_msgicon").css("font-size",16);
                    fontchange = 1;
                }else{
                    $("#j_top_msgicon").css("font-size",14);
                    fontchange = 0;
                }
                setTimeout(msgfontchange,1000);
            }
            function showSetName(){
                onOtherSetUsername();
                $.ajax({
                    url : "/index/setnamebox",
                    type : "POST",
                    dataType : "json",
                    success : function(res){
                        if(res.status==1){
                            $.dialog({id:'username_check_isok', title:"确认用户名", content:res.data, padding:'', fixed:false, lock:true, zIndex:200, width:'600px', background:"#000",opacity: 0.87}); 
                        }
                    }
                });
            }
            function getByteLen(val) {
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var length = val.charCodeAt(i);
                    if(length>=0&&length<=128){
                        len += 1;
                    }else{
                        len += 2;
                    }
                }
                return len;
            }
            function postcheckusername(username){
                $.ajax({
                    url : "/api/users/username_check_hassome",
                    type : "POST",
                    dataType : "json",
                    data : {username:username},
                    success : function(res){
                        if(res.status==1){
                            is_username_ok = 1;
                            $("#j_username_setok_tip").html('').hide();
                        }else{
                            is_username_ok = 0;
                            $("#j_username_setok_tip").html(res.msg).show();
                        }
                    }
                });
            }
            function checknameInput(str) {
                var pattern = /^[\w\u4e00-\u9fa5]+$/gi;
                if(!pattern.test(str)){
                    return false;
                }
                return true;
            }
            function checkusername_local(username){
                if(username!=''){
                    if(getByteLen(username)<4){
                        is_username_ok = 0;
                        $("#j_username_setok_tip").html("用户名不能少于4个字符").show();
                        return;
                    }
                    if(getByteLen(username)>16){
                        is_username_ok = 0;
                        $("#j_username_setok_tip").html("用户名不能超过16个字符").show();
                        return;
                    }
                    if(!checknameInput(username)){
                        is_username_ok = 0;
                        $("#j_username_setok_tip").html("用户名不能包含特殊符号").show();
                        return;
                    }
                    postcheckusername(username);
                }else{
                    is_username_ok = 0;
                    $("#j_username_setok_tip").html("用户名不能为空").show();
                }
            }


            function onOtherSetUsername(){
                o_document.on("blur","input[name=username_setok]",function(){
                    var username = $(this).val();
                    checkusername_local(username);
                });


                o_document.on("click",".J_post_setusername",function(){
                    var username = $('input[name=username_setok]').val();
                    if(is_username_ok){
                        $.ajax({
                            url : "/user/setusername",
                            type : "POST",
                            dataType : "json",
                            data : {username:username},
                            success : function(res){
                                if(res.status==1){
                                    $.cpk_alert_reload(res.msg);
                                    $.dialog.get('username_check_isok').close();
                                }else{
                                    is_username_ok = 0;
                                    $("#j_username_setok_tip").html(res.msg).show();
                                }
                            }
                        });
                    }
                });

            }

            function ajaxChange(){

                var _withDataObj = CPK_page_userdata.getWithObj();
                var withdata     = _withDataObj.getWithData();
                var withid       = _withDataObj.getWithId();

                $.ajax({
                    url : "/index/changeTopinfo",
                    type : "POST",
                    dataType : "json",
                    data : {"withdata" : withdata, "withid":withid},
                    success : function(res){
                        if(res.status==1){
                            if(res.data.isFirstLoginByOther == 1){
                                showSetName();
                            }
                            _withDataObj.callback(res);
                        }
                        msgJump();
                    }
                });
            }
            return obj;
        }
    }
    return CPK_ChangeTopInfo;
});
