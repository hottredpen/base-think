define(['jquery'],function($){
    var CPK_store_boxformsave = {
        createObj : function(){
            var obj = {};
            //店铺部件设置完毕后的保存
            obj.storePartSettingSubmit = function(postData){
                $.ajax({
                    url : '/dialog/storeTemplateSetting',
                    type : "POST",
                    dataType : "json",
                    data : postData,
                    success : function(res){
                        if(res.status == 1){
                            obj.storePartSettingSubmitCallback(postData);
                        }
                    }
                });
            };
            obj.storePartSettingSubmitCallback = function(submitData){
                $.ajax({
                    url : "/custom/getFreedomBlock",
                    type : "POST",
                    dataType : "json",
                    data : {
                        "partname"    : submitData["boxname"],
                        "template_id" : 1,
                        "pageid"      : submitData["pageid"],
                        "layoutid"    : submitData["layoutid"],
                        "spaceid"     : submitData["spaceid"]
                    },
                    success : function(res){
                    },
                    error :function(error){
                        if(submitData["noDelBtn"]==1){
                            $("#commonSpace"+submitData["spaceid"]+"block").html(error.responseText).prepend('<div class="inedit editDiv"><a href="javascript:;" class="block-setting J_setting_block" title="设置" data-spaceid="'+submitData["spaceid"]+'"  data-boxname="'+submitData["boxname"]+'" data-partcnname="'+partcnname[submitData["boxname"]]+'">设置</a></div>');
                        }else{
                            $("#commonSpace"+submitData["spaceid"]+"block").html(error.responseText).prepend('<div class="inedit editDiv"><a href="javascript:;" class="block-cancel J_del_block" title="删除" data-spaceid="'+submitData["spaceid"]+'"  data-boxname="'+submitData["boxname"]+'">删除</a><a href="javascript:;" class="block-setting J_setting_block" title="设置" data-spaceid="'+submitData["spaceid"]+'"  data-boxname="'+submitData["boxname"]+'" data-partcnname="'+partcnname[submitData["boxname"]]+'">设置</a></div>');
                        }
                        $.dialog.get('storeTemplateSetting').close();
                    }
                });
            };
            return obj;
        }
    }
    return CPK_store_boxformsave;
});
