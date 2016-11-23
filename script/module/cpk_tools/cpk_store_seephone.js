define(['jquery'],function($){
    var CPK_store_seephone = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            obj.init = function(){
                onClickseeBtn();
            }
            function onClickseeBtn(){

                o_document.on("click",".J_see_witkey_phone",function(){
                    var witkeyid = $(this).attr("rel");
                    Ajaxtofind(witkeyid);
                });

                o_document.on("click",".J_close_seephonelog",function(){
                    $.dialog.get("seephone_box").close();
                });
            }
            function Ajaxtofind(witkeyid){
                $.ajax({
                    url : '/user/wantseephone',
                    type : "POST",
                    dataType : "json",
                    data  :{witkeyid:witkeyid},
                    success : function(res){
                        if(res.status==1){
                            var info_temp = res.data;
                            $.dialog({id:'seephone_box', title:"查看联系", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                        }else if(res.status==-1){
                            showLoginForm();
                        }else{
                            $.cpk_alert(res.msg);
                        }
                    }
                });
            }
            return obj;
        }
    }
    return CPK_store_seephone;
});
