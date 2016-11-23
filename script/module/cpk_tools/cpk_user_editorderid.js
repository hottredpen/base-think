define(['jquery'],function($){
    var CPK_user_editorderid = {
        createObj : function(){
            var obj  = {};
            var o_document = $(document);
            var modeltype;

            obj.init = function(){
                _initThisPageModel();
                onClickBtn();
                onInputBlur();
            }

            function _initThisPageModel(){
                modeltype = $('input[name=modeltype]').val();
            }

            function onClickBtn(){

                o_document.on("click",".J_edit_item_orderid",function(){
                    var othis = $(this);
                    var id    = othis.attr("data-id");
                    othis.hide();
                    $("#j_item_orderid_span_"+id).hide();
                    $("#j_item_orderid_input_"+id).show().focus();
                    $("#j_item_orderid_edit_"+id).hide();
                });
            }

            function onInputBlur(){
                o_document.on("blur",".J_item_orderid_input",function(){
                    var othis   = $(this);
                    var orderid = othis.val();
                    var id      = othis.attr("data-id");
                    othis.hide();
                    $("#j_item_orderid_span_"+id).text(orderid).show();
                    $("#j_item_orderid_edit_"+id).show();
                    ajaxChangeOrderId(id,orderid);
                });
            }
            function ajaxChangeOrderId(id,orderid){
                if(modeltype == '' || typeof modeltype == "undefined"){
                    return ;
                }
                $.ajax({
                    url : '/user/changeorderid',
                    type : "POST",
                    dataType : "json",
                    data : {id:id,type:modeltype,orderid:orderid},
                    success : function(res){
                        if(res.status == 0){
                            $.cpk_alert(res.msg);
                        }
                    }
                });
            }
            return obj;
        }
    }
    return CPK_user_editorderid;
});
