define(['jquery'],function($){
    var CPK_user_bind = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            obj.init = function(){
                if($(".J_user_bind_other").length>0 || $(".J_user_unbind_other").length>0){
                    onBindBtn();
                    onUnBindBtn();
                }
            }

            function onBindBtn(){
                o_document.on("click",".J_user_bind_other",function(){
                    var str = $(this).attr("data-type");
                    var bid = $("#bd_"+str).attr("data-bid");
                    if(parseInt(bid)==0 || isNaN(parseInt(bid))){
                        location.href ="/oauth/index/type/bind/mod/"+str;
                    }
                });
            }

            function onUnBindBtn(){
                o_document.on("click",".J_user_unbind_other",function(){
                    var bindid = $(this).attr("data-bindid");
                    $.cpk_confirm("系统消息", "您确定要解绑？", function(result){
                        if(result=="ok"){
                            $.ajax( {
                                url:'/user/unbind',
                                type:'post',
                                cache:false,
                                data : {id:bindid},
                                dataType:'json',
                                success:function(data) {
                                    if(data.status ==1 ){
                                        location.reload();
                                    }else{
                                        $.cpk_alert(data.msg);
                                    }
                                }
                            });
                        }
                    });
                });
            }
            return obj;
        }
    }
    return CPK_user_bind;
});
