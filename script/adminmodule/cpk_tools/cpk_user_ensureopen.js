define(['jquery'],function($){
    var CPK_user_ensureopen = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var totalmoney = 0;
            var selectArr  = [];

            obj.init = function(){
                onSelectEnsureBtn();
                onSendEnsureOpen();
                onEnsureAddmoreMoneyBtn();
                onEnsureToAmountBtn();
            }

            function onSelectEnsureBtn(){
                o_document.on("click",".J_openensure_product",function(){
                    var o_this = $(this);
                    var ensureid = $(this).attr("rel");
                    if(o_this.hasClass("on")){
                        o_this.removeClass("on");
                        $("#iic"+ensureid).hide();
                        totalmoney = totalmoney - 1000;
                    }else{
                        o_this.addClass("on");
                        $("#iic"+ensureid).show();
                        totalmoney = totalmoney + 1000;
                    }
                    $("#ensureallmoney").text(totalmoney);
                });

            }

            function onSendEnsureOpen(){

                o_document.on("click",".J_open_ensure_save",function(){
                    var accpet = $('#acceptcheck').attr("checked");
                    if(accpet==null){
                        $.cpk_alert("请阅读并接受《保障服务协议》");
                        return false;
                    }

                    selectArr = [];
                    $(".J_openensure_product").each(function(){
                        if($(this).hasClass("on")){
                            selectArr.push($(this).attr("rel"));
                        }
                    });


                    if(selectArr.length==0){
                        $.cpk_alert("保障类目不能为空");
                        return false;
                    }

                    $.ajax({
                        url : '/ensure/joinfromcenter',
                        type : "POST",
                        dataType : "json",
                        data : {ensureids:selectArr.join(","),step:"savefromcenter"},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                location.href = res.data;
                            }
                        }
                    });
                });
            }
            function onEnsureAddmoreMoneyBtn(){

                onSendEnsureAddmoreMoney();

                o_document.on("click",".J_jiaona",function(){
                    var type = $(this).attr("rel");
                    $.ajax({
                        url:'/dialog/jiaona',
                        type:"post",
                        dataType:"json",
                        data:{step:"getform",type:type,is_require_new:1},
                        success:function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'jiaona_box', title:"缴纳保证金", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }  
                    });
                });
            }

            function onEnsureToAmountBtn(){

                onSaveEnsureToAmount();

                o_document.on("click",".J_ensure_to_amount",function(){
                    $.ajax({
                        url:'/user/ensuretoamountform',
                        type:"post",
                        dataType:"json",
                        success:function(res){
                            if(res.status == 1){
                                var info_temp = res.data; 
                                $.dialog({id:'ensuretoamount_box', title:"提取保证金", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
                            } else {
                                $.cpk_alert(res.msg);
                            }
                        }  
                    });
                });
            }

            function onSaveEnsureToAmount(){
                o_document.on("click","#J_save_ensure_to_amount",function(){
                    var qtype = $('input[name=qtype]:checked').val();
                    var getmoney = $('input[name=m_money]').val();
                    $.ajax({
                        url:'/user/saveensuretoamount',
                        type:"post",
                        dataType:"json",
                        data : {qtype:qtype,getmoney:getmoney},
                        success:function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                $.dialog.get("ensuretoamount_box").close();
                                $.cpk_alert_reload(res.msg);
                            }
                        }  
                    });
                });
            }

            function onSendEnsureAddmoreMoney(){
                o_document.on("click","#J_save_jiaona",function(){
                    var jtype = $('input[name=jtype]:checked').val();
                    var money = $('input[name=m_money]').val();
                    if(parseInt(money)==0 || money==""){
                        $.cpk_alert('金额必填');
                        $('input[name=m_money]').focus();
                    }
                    $.ajax({
                        url : '/dialog/jiaona',
                        type : "POST",
                        dataType : "json",
                        data : {jtype:jtype,money:money, step:"saveform"},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                location.href = res.data;
                            }
                        }
                    });
                });
            }
            return obj;
        }
    }
    return CPK_user_ensureopen;
});
