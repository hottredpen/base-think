define(['jquery'],function($){

    var CPK_user_selecthandle = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);
            var selectArr  = [];
            var selectAllstatus = 0;
            var delUrl,readUrl,recommendUrl,closeUrl,inviteUrl,invite_taskid;

            var has_init = 0;

            obj.init = function(){
                has_init = 1;
                _initDelurlAndReadurl();
            	_initSelectedBackgroundColor();
                onOneHandleBtn();
                onAllHandleBtn();

                onDelOneItemBtn();
                onDelAllItemBtn();
                onReadOneItemBtn();
                onReadAllItemBtn();
                onRecommendOneItemBtn();
                onRecommendAllItemBtn();
                onUnrecommendOneItemBtn();
                onUnrecommendAllItemBtn();
                onCloseOneItemBtn();
                onCloseAllItemBtn();
                onOpenOneItemBtn();
                onOpenAllItemBtn();
                onInviteOneItemBtn();
                onInviteAllItemBtn();
            }
            obj.getIsInit = function(){
                return has_init;
            }


            function _initDelurlAndReadurl(){
                delUrl       = $("input[name=j_delurl]").val();
                readUrl      = $("input[name=j_readurl]").val();
                recommendUrl = $("input[name=j_recommendurl]").val();
                closeUrl     = $("input[name=j_closeurl]").val();
                inviteUrl    = $("input[name=j_inviteurl]").val();
                invite_taskid= $("input[name=j_invite_taskid]").val();
            }

            function _initSelectedBackgroundColor(){
            	var selectNum  = 0;

				$(".J_checkitem").each(function(){
					var o_this = $(this);
					var o_item = $("#j_item_"+o_this.val());
			        if(o_this.attr("checked")){
			        	selectNum++;
			           	o_item.addClass("tb-select");
			        }
			    });

			    if(selectNum==$(".J_checkitem").length){
			    	selectAllstatus = 1;
			    }
            }

            function onOneHandleBtn(){
            	o_document.on("click",".J_checkitem",function(){
            		var o_item = $("#j_item_"+this.value);
            		if(o_item.hasClass("tb-select")){
            			o_item.removeClass("tb-select");
            		}else{
            			o_item.addClass("tb-select");
            		}
            	});
            }

            function onAllHandleBtn(){
            	o_document.on("click",".J_checkall",function(){
            		if(selectAllstatus){
            			selectAllstatus = 0;
            			$('.j_item').removeClass("tb-select");
            		}else{
            			selectAllstatus = 1;
            			$('.j_item').addClass("tb-select");
            		}
					$('.J_checkitem').attr('checked', this.checked);
					$('.J_checkall').attr('checked', this.checked);
            	});
            }

            function onDelOneItemBtn(){
            	o_document.on("click",".J_del_item",function(){
            		var id = $(this).attr("rel");
            		selectArr = [];
            		selectArr.push(id);
            		delectItemByIds();
            	});
            }

            function onDelAllItemBtn(){
            	o_document.on("click",".J_del_all_item",function(){

            		selectArr = [];
					$(".J_checkitem").each(function(){
				        if($(this).attr("checked")){
				            selectArr.push($(this).val());
				        }
				    });
				    delectItemByIds();
            	});
            }

            function onReadOneItemBtn(){
                o_document.on("click",".J_read_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    readItemByIds();
                });
            }

            function onReadAllItemBtn(){
                o_document.on("click",".J_read_all_item",function(){

                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    readItemByIds();
                });
            }
            function onRecommendOneItemBtn(){
                o_document.on("click",".J_recommend_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    recommendItemByIds(1);
                });
            }

            function onRecommendAllItemBtn(){
                o_document.on("click",".J_recommend_all_item",function(){
                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    recommendItemByIds(1);
                });
            }
            function onUnrecommendOneItemBtn(){
                o_document.on("click",".J_unrecommend_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    recommendItemByIds(0);
                });
            }

            function onUnrecommendAllItemBtn(){
                o_document.on("click",".J_unrecommend_all_item",function(){
                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    recommendItemByIds(0);
                });
            }
            function onCloseOneItemBtn(){
                o_document.on("click",".J_close_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    closeItemByIds(0);
                });
            }

            function onCloseAllItemBtn(){
                o_document.on("click",".J_close_all_item",function(){
                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    closeItemByIds(0);
                });
            }
            function onOpenOneItemBtn(){
                o_document.on("click",".J_open_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    closeItemByIds(1);
                });
            }

            function onOpenAllItemBtn(){
                o_document.on("click",".J_open_all_item",function(){
                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    closeItemByIds(1);
                });
            }
            function onInviteOneItemBtn(){
                o_document.on("click",".J_invite_item",function(){
                    var id = $(this).attr("rel");
                    selectArr = [];
                    selectArr.push(id);
                    inviteItemByIds(0);
                });
            }
            function onInviteAllItemBtn(){
                o_document.on("click","#J_invite_all_item",function(){
                    selectArr = [];
                    $(".J_checkitem").each(function(){
                        if($(this).attr("checked")){
                            selectArr.push($(this).val());
                        }
                    });
                    inviteItemByIds(1);
                });
            }

            function delectItemByIds(){
                if(delUrl=="" || typeof delUrl == "undefined"){
                    return;
                }
                if(selectArr.length==0){
                    $.cpk_alert("请选择删除选项");
                    return;
                }
			    $.cpk_confirm("系统消息", "确定要删除选中项？", function(result){
			        if(result == "ok"){
			            $.ajax({
			               	url : delUrl,
			               	type: 'POST',
			               	dataType: 'json',
			               	data : {id:selectArr.join(',')},
			               	success : function(result){
			                  	if(result.status == 1){
			                    	location.reload();
			                  	} else {
			                    	$.cpk_alert(result.msg);
			                 	}
			               	}
			            });
			        }
			    });
            }

            function readItemByIds(){
                if(readUrl=="" || typeof readUrl == "undefined"){
                    return;
                }
                if(selectArr.length==0){
                    $.cpk_alert("请选择标记选项");
                    return;
                }
                $.cpk_confirm("系统消息", "确定要将选中记录标记为已读？", function(result){
                    if(result == "ok"){
                        $.ajax({
                            url : readUrl,
                            type: 'POST',
                            dataType: 'json',
                            data : {id:selectArr.join(',')},
                            success : function(result){
                                if(result.status == 1){
                                    location.reload();
                                } else {
                                    $.cpk_alert(result.msg);
                                }
                            }
                        });
                    }
                });
            }

            function recommendItemByIds(recommendvalue){
                if(recommendUrl=="" || typeof recommendUrl == "undefined"){
                    return;
                }
                if(selectArr.length==0){
                    if(recommendvalue==1){
                        $.cpk_alert("请选择推荐选项");
                    }else{
                        $.cpk_alert("请选择取消推荐选项");
                    }
                    return;
                }

                $.ajax({
                    url : recommendUrl,
                    type: 'POST',
                    dataType: 'json',
                    data : {id:selectArr.join(','),recommend:recommendvalue},
                    success : function(result){
                        if(result.status == 1){
                            location.reload();
                        } else {
                            $.cpk_alert(result.msg);
                        }
                    }
                });

            }
            function closeItemByIds(itemstatus){
                if(closeUrl=="" || typeof closeUrl == "undefined"){
                    return;
                }
                if(selectArr.length==0){
                    if(itemstatus==1){
                        $.cpk_alert("请选择开启选项");
                    }else{
                        $.cpk_alert("请选择关闭选项");
                    }
                    
                    return;
                }

                $.ajax({
                    url : closeUrl,
                    type: 'POST',
                    dataType: 'json',
                    data : {id:selectArr.join(','),status:itemstatus},
                    success : function(result){
                        if(result.status == 1){
                            location.reload();
                        } else {
                            $.cpk_alert(result.msg);
                        }
                    }
                });

            }
            function inviteItemByIds(ismany){
                if(inviteUrl=="" || typeof inviteUrl == "undefined"){
                    return;
                }
                if(selectArr.length==0){
                    $.cpk_alert("请选择邀请的人才");
                    return;
                }
                $.ajax({
                    url : inviteUrl,
                    type: 'POST',
                    dataType: 'json',
                    data : {id:selectArr.join(','),taskid:invite_taskid},
                    success : function(result){
                        if(result.status == 1){
                            var hasinvite = result.data;
                            $(".J_invite_item").each(function(){
                                var o_this     = $(this);
                                var o_witkeyid = o_this.attr("rel");
                                if($.inArray(o_witkeyid,hasinvite)==-1){

                                }else{
                                    o_this.removeClass("J_invite_item");
                                    o_this.addClass("u_hasinvite_item");
                                }
                            });

                            if($(".J_invite_item").length==0){
                                $.cpk_alert(result.msg);
                                $("#J_refresh_weike").trigger("click");
                                $("#J_checkall").attr("checked",false);
                            }
                            
                        } else {
                            $.cpk_alert(result.msg);
                        }
                    }
                });
            }
            return obj;
        }
    }
    return CPK_user_selecthandle;
});

