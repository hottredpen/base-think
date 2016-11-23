define(['jquery','ZeroClipboard'],function($,ZeroClipboard){
    var CPK_copylink = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var itemidArr = [];

            obj.init = function(){
                if($('input[name="modeltype"]').length>0){
                    _init_itemidArr();
                    _init_zero();
                    onClickBtn();
                }
            }
            function _init_itemidArr(){
                $(".J_item_copy_link").each(function(){
                    itemidArr.push($(this).attr("data-id"));
                });
            }
            function _init_zero(){
                for (var i = itemidArr.length - 1; i >= 0; i--) {
                    _start_init_zero(itemidArr[i]);
                }
            }
            function _start_init_zero(id){
                var _client = new ZeroClipboard( $("#j_item_copylink_a_"+id) );
                _client.on( "ready", function( readyEvent ) {
                    _client.on( "aftercopy", function( event ) {
                        //console.log("Copied text to clipboard: " + event.data["text/plain"] );
                        o_document.trigger("zeroiscopyok");
                    });
                });
            }

            function onClickBtn(){
                o_document.on("mouseover",".J_item_copy_link",function(){
                    var o_this   = $(this);
                    var id       = o_this.attr("data-id");
                    var n_itemId = o_this.attr("id");
                    $("#j_copylink_value").val($('#j_item_copylink_input_'+id).val());
                });

                o_document.on("zeroiscopyok",function(){
                    $.cpk_alert("内容已经复制到剪贴板！");
                });

            }

            return obj;
        }
    }
    return CPK_copylink;
});
