define(['jquery'],function($){
    var CPK_user_kefu = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);


            obj.init = function(){
                _init_QQtype();
                onKefuQQTypechange();
                onSendSaveQQ();
                onQQcloseBtn();
            }
            function onKefuQQTypechange(){
                
                o_document.on('click','.J_qq_type',function(){
                    var qqtype = $("input[name=qqtype]:checked").val();
                    changeHtmlByQQType(qqtype);
                });
            }

            function _init_QQtype(){
                var qqtype = $("input[name=qqtype]:checked").val();
                changeHtmlByQQType(qqtype);
            }

            function changeHtmlByQQType(qqtype){
                if (qqtype == 1){
                    $("#person_qq").hide();
                    $("#company_qq").show();
                }else{
                    $("#person_qq").show();
                    $("#company_qq").hide();
                }
            }

            function onSendSaveQQ(){
                o_document.on("click","#J_kefusave",function(){

                    var k_qq     = $('input[name=k_qq]').val();
                    var k_qqtype = $('input[name=qqtype]:checked').val();
                    var k_qq_key = $('input[name=k_qq_key]').val();
                    var k_name   = $('input[name=k_name]').val();
                    var k_open   = $('input[name=k_open]:checked').val();
                    var kid      = $('input[name=kid]').val();
                    $.ajax({
                        url : "/user/savekefu",
                        type : "POST",
                        dataType : "json",
                        data : {qq:k_qq,qq_key:k_qq_key,qqtype:k_qqtype,name:k_name,open:k_open,kid:kid},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                $('input[name=k_qq]').val("");
                                $('input[name=k_name]').val("");
                                location.href="/user/kefu";
                            }
                        }
                    });
                });
            }

            function onQQcloseBtn(){

                o_document.on("click",".J_change_qq_status",function(){
                    var thisele = $(this);
                    var open    = thisele.attr("rel");
                    var id      = thisele.attr("data-id");
                    var infoele = $("#kefuStatusInfo_"+id);
                    $.ajax({
                        url : "/user/changeKefuOpen",
                        type : "POST",
                        dataType : "json",
                        data : {id:id,open:open},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                if(open==1){
                                thisele.html("关闭");
                                infoele.html("<font class='blue'>开启</font>");
                                thisele.attr("rel",0);
                                }else{
                                thisele.html("开启");
                                infoele.html("<font class='red'>关闭</font>");
                                thisele.attr("rel",1);
                                }
                            }
                        }
                    });
                });
            }


            return obj;
        }
    }
    return CPK_user_kefu;
});
