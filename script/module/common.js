define(['jquery',
	'./cpk_tools/cpk_report',
	'./cpk_tools/cpk_contact',
	'./cpk_tools/cpk_collect',
	'./cpk_tools/cpk_changetopinfo',
	'./cpk_tools/cpk_searchbox',
	'./cpk_tools/cpk_navcate',
	'./cpk_tools/cpk_openstore',
	'./cpk_tools/cpk_logindialog'
	],

	function($,CPK_report,CPK_contact,CPK_collect,CPK_changetopinfo,CPK_searchbox,CPK_navcate,CPK_openstore,CPK_logindialog){
		var o_document = $(document);

		onCPK_select();
		//更新验证码
		o_document.on("j_cpk_alert_trigger",function(){
			if($("#j_captchaImg").length > 0){
				$("#j_captchaImg").trigger("click");
			}
		});

		//检测登录的页面跳转
		o_document.on("click",".J_common_tourl",function(){
			var _url = $(this).attr("data-url");
			if($("#j_top_msgicon").length>0){
				location.href = _url;
			}else{
				showLoginForm(_url);
			}
		});

	    var _report = CPK_report.createObj();
		_report.init();

	    var _contact = CPK_contact.createObj();
		_contact.init();

	    var collectObj = CPK_collect.createObj();
		collectObj.initCollectBtn();

		var changeTopInfoObj = CPK_changetopinfo.createObj();
		changeTopInfoObj.init();

		var searchboxObj = CPK_searchbox.createObj();
		searchboxObj.init();

		var navcateObj = CPK_navcate.createObj();
		navcateObj.initNav();

		var _openstore = CPK_openstore.createObj();
		_openstore.init();

		var _logindialog = CPK_logindialog.createObj();
		_logindialog.init();
		
		var o_gotop = $('#J_goTop');

        o_document.on("scroll",function(){
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if(top>200){
            	o_gotop.show();
            }
            if(top==0){
            	o_gotop.hide();
            }
        });


		o_gotop.click(function(){
			$('html,body').animate({scrollTop: '0px'}, 800);
		});


		//top下拉
		o_document.on("mouseenter",".subnav_top",function(){
			$(this).find('div').removeClass('hidden').addClass('block');
			$(this).find('.subtop_bar').addClass('on');
		}).on("mouseleave",".subnav_top",function(){
			$(this).find('div').removeClass('block').addClass('hidden');
			$(this).find('.subtop_bar').removeClass('on');
		});

		//给我们建议
		$('.J_suggestion').on('click', function(){
		    $('.msg_send_to').off('click');
		    var id = $(this).attr('rel');
		    $.ajax({
		        url      : "/dialog/suggestion",
		        type     : "POST",
		        dataType : "json",
		        data     : {uid:id,step:"getform",is_require_new:1},
		        success  : function (result){
		            if(result.status == 1){
		                var info_temp = result.data;
		                $.dialog({id:'suggestion_box', title:"给我们建议", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'700px'});
		            }else{
		                $.cpk_alert(result.msg);
		            }
		        }
		    })
		});

		//邀请
		$('.invite_one_getform').live('click', function(){
			$('.invite_one_ok').die('click');
			var uid = $(this).attr('rel');
		   	$.ajax({
			   url : "/dialog/ajax_invite_one_getform",
			   type : "POST",
			   dataType : "json",
			   data : {uid:uid},
			   success : function(res){
				   if(res.status == 1){
					   var info_temp = res.data;
					   $.dialog({id:'alert_info_box_yaoqing', title:"选择参与的任务", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'400px'});
				   } else {
					   $.cpk_alert(res.msg);
					   return false;
				   }
			   }
			});
		});



		o_document.on('click','.close',function(){
			$.dialog.get('alert_info_box').close();
		});

		o_document.on('click','.reload',function(){
			window.location.reload();
		});

		//分页的跳转第几页
		o_document.on("blur","input[name=page_jump_to_value]",function(){
			var gotopage = parseInt($(this).val());
			var maxpage  = parseInt($(this).attr("data-maxpage"));
			var o_btn    = $("#j_page_jump_btn");
			var n_href   = o_btn.attr("href");
			if(typeof gotopage =="undefined" || isNaN(gotopage) || parseInt(gotopage)<=0){
				$("#j_page_jump_btn").attr("href","#");
			}
			gotopage = gotopage > maxpage ? maxpage : gotopage; 
			n_href = n_href.replace(/([\w\/]+)\s*\/([\?]+)p=([\d]+)\s*([\/\w]*)/, "$1/?p="+gotopage); 
			$("#j_page_jump_btn").attr("href",n_href);
		});


		function onCPK_select(){

			o_document.on("click",".cpk_select_component",function(e){
                var element = $(this);
                e.stopPropagation();
                var display =$('.cpk_select_list').css('display');
                if(display == 'none'){
                    $(".cpk_select_list").fadeIn(200);
                }else{
                    $(".cpk_select_list").hide();
                }
			});

			o_document.on("click",".cpk_select_list_li",function(e){
				var typeid = $(this).attr("data-typeid");
                $("#J_cpk_select_component_text .txt").html($(this).html());
                $(".cpk_select_list").hide();
                $("#J_rtype").val($(this).html());
                $("#J_rtype_value").val(typeid);
                e.stopPropagation();
			});
		}
	}
);