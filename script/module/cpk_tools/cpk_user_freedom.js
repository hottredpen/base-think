define(['jquery','./cpk_colorpicker','./cpk_imgbox_upload','./cpk_store_boxformsave','./cpk_kindeditor','./cpk_uploadify'],function($,CPK_colorpicker,CPK_imgbox_upload,CPK_store_boxformsave,CPK_kindeditor,CPK_uploadify){
    var CPK_user_freedom = {
        createObj : function(){
            var obj = {};
            var o_document = $(document);

            var custom_some_change = false;
            var g_layoutid;
            var g_pageid;
            var g_spaceid;



            var scrollTop = 0;

            var successinfoArr;
            var wait = 10;
            
            obj.init = function(){
                onscroll();
                _init_pageid_layoutid();
                onSettingBlockBtn();
                onEveryDialogSave();
                onHideOrShowSpaceBtn()
                onSplitSpaceBtn();
                onJoinSpaceBtn();
                onDelSpaceContent();
                onfreedomBoxMove();

                window.onbeforeunload = function(){
                    if(custom_some_change){
                        return "您确定要退出页面吗？";
                    }else{
                        return;
                    }
                }
            }
            function onscroll(){
                window.onscroll = function () {  
                    var top = document.documentElement.scrollTop || document.body.scrollTop;
                    scrollTop = top;
                };
            }

            function _init_pageid_layoutid(){
                g_layoutid  = layoutid;
                g_pageid    = pageid;
            }

            function _init_spaceid(spaceid){
                g_spaceid  = spaceid;
            }

            function onSettingBlockBtn(){
                o_document.on("click",".J_setting_block",function(){

                    o_document.off("mousemove").off("mouseup");
                    var spaceid = $(this).attr("data-spaceid");
                    var boxname = $(this).attr("data-boxname");
                    var partcnname= $(this).attr("data-partcnname");
                    $.ajax({
                        url : '/dialog/storeTemplateSetting',
                        type : "POST",
                        dataType : "json",
                        data : {spaceid:spaceid,pageid:pageid,layoutid:layoutid,boxname:boxname,"step":"getform","is_require_new":1},
                        success : function(res){
                            if(res.status == 1){
                                var info_temp = res.data;
                                $.dialog({id:'storeTemplateSetting', title:partcnname+"设置", content:info_temp, padding:'', fixed:false, lock:true, zIndex:200, width:'630px'});
                                onColorPickerInit();
                                _init_spaceid(spaceid);
                                onImgBoxInit();
                                kindediter_init();
                            } else {
                                $.cpk_alert(res.msg);
                                return false;
                            }
                        }
                    });
                });

                o_document.on("click",".btnCancel",function(){
                    $.dialog.get('storeTemplateSetting').close();
                });

                o_document.on("click",".J_btnCancel",function(){
                    $.dialog.get('storeTemplateSetting').close();
                });


            }
            function onColorPickerInit(){
                var templateColorPicker = CPK_colorpicker.createObj();
                templateColorPicker.init();
            }

            function onEveryDialogSave(){
                
                onAboutForm();
                onBannerForm();
                onCaseForm();
                onCaseCateForm();
                onCaseRecommendForm();
                onContactForm();
                onHeaderForm();
                onInfoForm();
                onNavForm();
                onPosterForm();
                onPosterTwoForm();
                onPosterThreeForm();
                onServiceForm();
                onServiceCateForm();
                onServiceRecommendForm();
                onSourceForm();
                onSourceCateForm();
                onSourceRecommendForm();
                onPublishStore();
                onChangeThemeCustom();
            }

            function onPublishStore(){
                $("#J_publish_storeTemplate_doing").click(function(){
                    var o_this   = $(this);
                    var pageid   = o_this.attr("data-pageid");
                    var layoutid = o_this.attr("data-layoutid");
                    $(".j_custonlayout_checkimg").addClass("hidden_important");
                    $("#j_custonlayout_checkimg_"+layoutid).removeClass("hidden_important");
                    checkstoretemplate(pageid,layoutid);
                });
            }
            function checkstoretemplate(pageid,layoutid){
                var bgcolor       = $("input[name='backgroundcolor']").val();
                var bodybgimg     = $("input[name='bodybgimg']").val();
                var bodyimgrepeat = $('input:radio[name=bodyimgrepeat]:checked').val();
                $.ajax({
                    url : "/custom/publish_storeTemplate",
                    type : "POST",
                    dataType : "json",
                    data : {bgcolor:bgcolor,bodybgimg:bodybgimg,bodyimgrepeat:bodyimgrepeat,pageid:pageid,layoutid:layoutid},
                    success : function(res){
                        if(res.status==1){
                            $.cpk_alert(res.msg);
                            // successinfoArr = res.data;
                            // startpublish();
                            // custom_some_change = false;
                        }else{
                            $.cpk_alert(res.msg);
                        }
                  }
                });
            }
            function startpublish(){
                if(successinfoArr.length>0){
                   var pinfo = successinfoArr[0].info;
                   successinfoArr.remove(successinfoArr[0]);
                   $("#publishstatus").append("<p>"+pinfo+"</p>");
                    if (wait <= 0) {
                        wait = 10;
                    } else {
                        wait--;
                        setTimeout(function() {
                            startpublish();
                        },50);
                    }
                }
            }
            function kindediter_init(){
                if($('.j_kindeditor').length>0){
                    var textareaID  = $('.j_kindeditor').attr("data-id");
                    var _kindeditor = CPK_kindeditor.createObj();
                    _kindeditor.init({'textareaID':textareaID});
                }
            }



            function onHeaderForm(){
                o_document.on("click","#J_shopheader_submit_save",function(){
                    var postData ={
                        "step"     : "saveform",
                        "noDelBtn" : 1,
                        "boxname"  : "shopheaderBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopheaderwidthtype" : $('input:radio[name=shopheaderwidthtype]:checked').val(),
                        "shopheaderheight"    : $('input[name=shopheaderheight]').val(),
                        "shopheadercolor"     : $('input[name=shopheadercolor]').val(),
                        "shopheaderimg"       : $('input[name=shopheaderimg]').val(),
                        "bgimgrepeat"         : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"      : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onAboutForm(){

                o_document.on("click","#J_shopabout_submit_save",function(){
                    var postData ={
                        "step"     : "saveform",
                        "boxname"  : "shopaboutBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopaboutbgcolor"              : $('input[name=shopaboutbgcolor]').val(),
                        "shopaboutbgimg"                : $('input[name=shopaboutbgimg]').val(),
                        "shopabouttitlefontcolor"       : $('input[name=shopabouttitlefontcolor]').val(),
                        "shopaboutinfo"                 : $('textarea[name=info]').val(),
                        "shopaboutbuybtncolor"          : $('input[name=shopaboutbuybtncolor]').val(),
                        "shopaboutbuybtnhovercolor"     : $('input[name=shopaboutbuybtnhovercolor]').val(),
                        "shopaboutbuybtnfontcolor"      : $('input[name=shopaboutbuybtnfontcolor]').val(),
                        "shopaboutbuybtnhoverfontcolor" : $('input[name=shopaboutbuybtnhoverfontcolor]').val(),
                        "bgimgrepeat"                   : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }
            function onBannerForm(){
                o_document.on("click","#J_shopbanner_submit_save",function(){
                    var listimgidArr = [];
                    var listimgArr   = [];
                    var listgotoArr  = [];
                    var listordidArr = [];
                    $('input[name=shopbannerlistimgid]').each(function(i,ele){
                        listimgidArr[i]= ele.value;
                    });
                    $('input[name=shopbannerlistimg]').each(function(i,ele){
                        listimgArr[i]= ele.value;
                    });
                    $('input[name=shopbannerlistgoto]').each(function(i,ele){
                        listgotoArr[i] = ele.value;
                    });
                    $('input[name=shopbannerlistordid]').each(function(i,ele){
                        listordidArr[i]= Number(ele.value);
                    });

                    var postData ={
                        "step"     : "saveform",
                        "boxname"  : "shopbannerBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopbannerwidthtype"    : $('input:radio[name=shopbannerwidthtype]:checked').val(),
                        "shopbannerheight"       : $('input[name=shopbannerheight]').val(),
                        "shopbannerbgcolor"      : $('input[name=shopbannerbgcolor]').val(),
                        "addmoreheight"          : $('input[name=addmoreheight]').val(),
                        "nextpartheight"         : $('input[name=nextpartheight]').val(),
                        "shopbannerlistimgid"    : listimgidArr,
                        "shopbannerlistimg"      : listimgArr,
                        "shopbannerlistgoto"     : listgotoArr,
                        "shopbannerlistordid"    : listordidArr
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });


                o_document.on("click",".J_del_shopbanner",function(){
                    var thisid = $(this).attr('rel');
                    $.ajax({
                        url : "/user/delallbanner",
                        type : "POST",
                        dataType : "json",
                        data : {id:thisid,step:"del"},
                        success : function(res){
                            if(res.status == 0){
                                $.cpk_alert(res.msg);
                            } else {
                                $('#bannerlistli_'+thisid).remove();
                                custom_some_change = true;
                            }
                        }
                    });
                });
            }

            function onChangeThemeCustom(){
                o_document.on("click",".J_changetheme_custom",function(){
                    var thisid = $(this).attr('rel');
                    $.ajax( {
                        url:'/user/changeTemplate',
                        data:{
                            "id" :thisid
                        },
                        type:'post',
                        cache:false,
                        dataType:'json',
                        success:function(res) {
                            if(res.status ==1 ){
                                window.location.reload();
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }


            function onCaseForm(){
                o_document.on("click","#J_shopcase_submit_save",function(){

                    var hangnumMax  = $("#casemore").attr("data-hangnumMax");
                    var postData ={
                        "step"     : "saveform",
                        "boxname"  : "shopcaseBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopcasehang"                 : $('input[name=shopcasehang]').val(),
                        "shopcasebgcolor"              : $('input[name=shopcasebgcolor]').val(),
                        "shopcasebgimg"                : $('input[name=shopcasebgimg]').val(),
                        "shopcasetitlefontcolor"       : $('input[name=shopcasetitlefontcolor]').val(),
                        "shopcasebuybtncolor"          : $('input[name=shopcasebuybtncolor]').val(),
                        "shopcasetitlehidden"          : $('input:radio[name=shopcasetitlehidden]:checked').val(),
                        "shopcasebuybtnhovercolor"     : $('input[name=shopcasebuybtnhovercolor]').val(),
                        "shopcasebuybtnfontcolor"      : $('input[name=shopcasebuybtnfontcolor]').val(),
                        "shopcasebuybtnhoverfontcolor" : $('input[name=shopcasebuybtnhoverfontcolor]').val(),
                        "addmoreheight"                : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                  : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"               : $('input[name=nextpartheight]').val(),
                        "shopcasehangnum"              : ($('input[name=shopcasehangnum]').val()>hangnumMax)?hangnumMax:$('input[name=shopcasehangnum]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onCaseCateForm(){
                o_document.on("click","#J_shopcasecate_submit_save",function(){
                    var postData ={
                        "step"     : "saveform",
                        "boxname"  : "shopcasecateBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopcasecatehang"                 : $('input[name=shopcasecatehang]').val(),
                        "shopcasecatehangnum"              : $('input[name=shopcasecatehangnum]').val(),
                        "shopcasecatebgcolor"              : $('input[name=shopcasecatebgcolor]').val(),
                        "shopcasecatebgimg"                : $('input[name=shopcasecatebgimg]').val(),
                        "shopcasecatetitlefontcolor"       : $('input[name=shopcasecatetitlefontcolor]').val(),
                        "shopcasecatebuybtncolor"          : $('input[name=shopcasecatebuybtncolor]').val(),
                        "shopcasecatebuybtnhovercolor"     : $('input[name=shopcasecatebuybtnhovercolor]').val(),
                        "shopcasecatebuybtnfontcolor"      : $('input[name=shopcasecatebuybtnfontcolor]').val(),
                        "shopcasecatebuybtnhoverfontcolor" : $('input[name=shopcasecatebuybtnhoverfontcolor]').val(),
                        "bgimgrepeat"                      : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                   : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onCaseRecommendForm(){
                o_document.on("click","#J_shopcaserecommend_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopcaserecommendBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopcaserecommendhang"                 : $('input[name=shopcaserecommendhang]').val(),
                        "shopcaserecommendhangnum"              : $('input[name=shopcaserecommendhangnum]').val(),
                        "shopcaserecommendbgcolor"              : $('input[name=shopcaserecommendbgcolor]').val(),
                        "shopcaserecommendtitlehidden"          : $('input:radio[name=shopcaserecommendtitlehidden]:checked').val(),
                        "shopcaserecommendbgimg"                : $('input[name=shopcaserecommendbgimg]').val(),
                        "shopcaserecommendtitlefontcolor"       : $('input[name=shopcaserecommendtitlefontcolor]').val(),
                        "shopcaserecommendbuybtncolor"          : $('input[name=shopcaserecommendbuybtncolor]').val(),
                        "shopcaserecommendbuybtnhovercolor"     : $('input[name=shopcaserecommendbuybtnhovercolor]').val(),
                        "shopcaserecommendbuybtnfontcolor"      : $('input[name=shopcaserecommendbuybtnfontcolor]').val(),
                        "shopcaserecommendbuybtnhoverfontcolor" : $('input[name=shopcaserecommendbuybtnhoverfontcolor]').val(),
                        "bgimgrepeat"                           : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                        : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onContactForm(){
                o_document.on("click","#J_shopcontact_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopcontactBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopcontactbgcolor"        : $('input[name=shopcontactbgcolor]').val(),
                        "shopcontactbgimg"          : $('input[name=shopcontactbgimg]').val(),
                        "shopcontacttitlefontcolor" : $('input[name=shopcontacttitlefontcolor]').val(),
                        "shopcontactskillfontcolor" : $('input[name=shopcontactskillfontcolor]').val(),
                        "bmphone"                   : $('input:radio[name=bmphone]:checked').val(),
                        "bgimgrepeat"               : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "addmoreheight"             : $('input[name=addmoreheight]').val(),
                        "nextpartheight"            : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onInfoForm(){
                o_document.on("click","#J_shopinfo_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopinfoBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopinfobgcolor"              : $('input[name=shopinfobgcolor]').val(),
                        "shopinfo2wbgcolor"            : $('input[name=shopinfo2wbgcolor]').val(),
                        "shopinfobgimg"                : $('input[name=shopinfobgimg]').val(),
                        "shopinfostorenamecolor"       : $('input[name=shopinfostorenamecolor]').val(),
                        "shopinfobuybtncolor"          : $('input[name=shopinfobuybtncolor]').val(),
                        "shopinfobuybtnhovercolor"     : $('input[name=shopinfobuybtnhovercolor]').val(),
                        "shopinfobuybtnfontcolor"      : $('input[name=shopinfobuybtnfontcolor]').val(),
                        "shopinfobuybtnhoverfontcolor" : $('input[name=shopinfobuybtnhoverfontcolor]').val(),
                        "addmoreheight"                : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                  : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"               : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onNavForm(){
                o_document.on("click","#J_shopnav_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "noDelBtn" : 1,
                        "boxname"  : "shopnavBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopnavbgcolor"         : $('input[name=shopnavbgcolor]').val(),
                        "shopnavfontcolor"       : $('input[name=shopnavfontcolor]').val(),
                        "shopnavlibordercolor"   : $('input[name=shopnavlibordercolor]').val(),
                        "shopnavselectcolor"     : $('input[name=shopnavselectcolor]').val(),
                        "shopnavselectfontcolor" : $('input[name=shopnavselectfontcolor]').val(),
                        "shopnavbgimg"           : $('input[name=shopnavbgimg]').val(),
                        "shopnavwidthtype"       : $('input:radio[name=shopnavwidthtype]:checked').val(),
                        "bgimgrepeat"            : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"         : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }
            function onServiceForm(){
                o_document.on("click","#J_shopservice_submit_save",function(){
                    var hangnumMax  = $("#servicemore").attr("data-hangnumMax");
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopserviceBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopservicehang"                 : $('input[name=shopservicehang]').val(),
                        "shopservicebgcolor"              : $('input[name=shopservicebgcolor]').val(),
                        "shopservicebgimg"                : $('input[name=shopservicebgimg]').val(),
                        "shopservicetitlefontcolor"       : $('input[name=shopservicetitlefontcolor]').val(),
                        "shopservicetitlehidden"          : $('input:radio[name=shopservicetitlehidden]:checked').val(),
                        "shopservicebuybtncolor"          : $('input[name=shopservicebuybtncolor]').val(),
                        "shopservicebuybtnhovercolor"     : $('input[name=shopservicebuybtnhovercolor]').val(),
                        "shopservicebuybtnfontcolor"      : $('input[name=shopservicebuybtnfontcolor]').val(),
                        "shopservicebuybtnhoverfontcolor" : $('input[name=shopservicebuybtnhoverfontcolor]').val(),
                        "addmoreheight"                   : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                     : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                  : $('input[name=nextpartheight]').val(),
                        "shopservicehangnum"              : ($('input[name=shopservicehangnum]').val()>hangnumMax)?hangnumMax:$('input[name=shopservicehangnum]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onServiceCateForm(){
                o_document.on("click","#J_shopservicecate_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopservicecateBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopservicecatehang"                 : $('input[name=shopservicecatehang]').val(),
                        "shopservicecatehangnum"              : $('input[name=shopservicecatehangnum]').val(),
                        "shopservicecatebgcolor"              : $('input[name=shopservicecatebgcolor]').val(),
                        "shopservicecatebgimg"                : $('input[name=shopservicecatebgimg]').val(),
                        "shopservicecatetitlefontcolor"       : $('input[name=shopservicecatetitlefontcolor]').val(),
                        "shopservicecatebuybtncolor"          : $('input[name=shopservicecatebuybtncolor]').val(),
                        "shopservicecatebuybtnhovercolor"     : $('input[name=shopservicecatebuybtnhovercolor]').val(),
                        "shopservicecatebuybtnfontcolor"      : $('input[name=shopservicecatebuybtnfontcolor]').val(),
                        "shopservicecatebuybtnhoverfontcolor" : $('input[name=shopservicecatebuybtnhoverfontcolor]').val(),
                        "bgimgrepeat"                         : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                      : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onServiceRecommendForm(){
                o_document.on("click","#J_shopservicerecommend_submit_save",function(){
                    var hangnumMax  = $("#servicerecommendTitle").attr("data-hangnumMax");
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopservicerecommendBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopservicerecommendhang"           : $('input[name=shopservicerecommendhang]').val(),
                        "shopservicerecommendhangnum"        : $('input[name=shopservicerecommendhangnum]').val(),
                        "shopservicerecommendbgcolor"        : $('input[name=shopservicerecommendbgcolor]').val(),
                        "shopservicerecommendbgimg"          : $('input[name=shopservicerecommendbgimg]').val(),
                        "shopservicerecommendtitlefontcolor" : $('input[name=shopservicerecommendtitlefontcolor]').val(),
                        "shopservicerecommendtitlehidden"    : $('input:radio[name=shopservicerecommendtitlehidden]:checked').val(),
                        "shopservicerecommendbuybtncolor"    : $('input[name=shopservicerecommendbuybtncolor]').val(),
                        "shopservicerecommendbuybtnhovercolor" : $('input[name=shopservicerecommendbuybtnhovercolor]').val(),
                        "shopservicerecommendbuybtnfontcolor"    : $('input[name=shopservicerecommendbuybtnfontcolor]').val(),
                        "shopservicerecommendbuybtnhoverfontcolor" : $('input[name=shopservicerecommendbuybtnhoverfontcolor]').val(),
                        "addmoreheight"                : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                  : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"               : $('input[name=nextpartheight]').val(),
                        "shopservicerecommendhangnum"  : ($('input[name=shopservicerecommendhangnum]').val()>hangnumMax)?hangnumMax:$('input[name=shopservicerecommendhangnum]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onSourceForm(){
                o_document.on("click","#J_shopsource_submit_save",function(){
                    var hangnumMax  = $("#sourcemore").attr("data-hangnumMax");
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopsourceBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopsourcehang"                 : $('input[name=shopsourcehang]').val(),
                        "shopsourcebgcolor"              : $('input[name=shopsourcebgcolor]').val(),
                        "shopsourcebgimg"                : $('input[name=shopsourcebgimg]').val(),
                        "shopsourcetitlefontcolor"       : $('input[name=shopsourcetitlefontcolor]').val(),
                        "shopsourcetitlehidden"          : $('input:radio[name=shopsourcetitlehidden]:checked').val(),
                        "shopsourcebuybtncolor"          : $('input[name=shopsourcebuybtncolor]').val(),
                        "shopsourcebuybtnhovercolor"     : $('input[name=shopsourcebuybtnhovercolor]').val(),
                        "shopsourcebuybtnfontcolor"      : $('input[name=shopsourcebuybtnfontcolor]').val(),
                        "shopsourcebuybtnhoverfontcolor" : $('input[name=shopsourcebuybtnhoverfontcolor]').val(),
                        "addmoreheight"                  : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                    : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                 : $('input[name=nextpartheight]').val(),
                        "shopsourcehangnum"  : ($('input[name=shopsourcehangnum]').val()>hangnumMax)?hangnumMax:$('input[name=shopsourcehangnum]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onSourceCateForm(){
                o_document.on("click","#J_shopsourcecate_submit_save",function(){
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopsourcecateBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopsourcecatehang"                 : $('input[name=shopsourcecatehang]').val(),
                        "shopsourcecatehangnum"              : $('input[name=shopsourcecatehangnum]').val(),
                        "shopsourcecatebgcolor"              : $('input[name=shopsourcecatebgcolor]').val(),
                        "shopsourcecatebgimg"                : $('input[name=shopsourcecatebgimg]').val(),
                        "shopsourcecatetitlefontcolor"       : $('input[name=shopsourcecatetitlefontcolor]').val(),
                        "shopsourcecatebuybtncolor"          : $('input[name=shopsourcecatebuybtncolor]').val(),
                        "shopsourcecatebuybtnhovercolor"     : $('input[name=shopsourcecatebuybtnhovercolor]').val(),
                        "shopsourcecatebuybtnfontcolor"      : $('input[name=shopsourcecatebuybtnfontcolor]').val(),
                        "shopsourcecatebuybtnhoverfontcolor" : $('input[name=shopsourcecatebuybtnhoverfontcolor]').val(),
                        "bgimgrepeat"                        : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                     : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onSourceRecommendForm(){
                o_document.on("click","#J_shopsourcerecommend_submit_save",function(){
                    var hangnumMax  = $("#sourcerecommendTitle").attr("data-hangnumMax");
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopsourcerecommendBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopsourcerecommendhang"                 : $('input[name=shopsourcerecommendhang]').val(),
                        "shopsourcerecommendbgcolor"              : $('input[name=shopsourcerecommendbgcolor]').val(),
                        "shopsourcerecommendbgimg"                : $('input[name=shopsourcerecommendbgimg]').val(),
                        "shopsourcerecommendtitlefontcolor"       : $('input[name=shopsourcerecommendtitlefontcolor]').val(),
                        "shopsourcerecommendbuybtncolor"          : $('input[name=shopsourcerecommendbuybtncolor]').val(),
                        "shopsourcerecommendbuybtnhovercolor"     : $('input[name=shopsourcerecommendbuybtnhovercolor]').val(),
                        "shopsourcerecommendbuybtnfontcolor"      : $('input[name=shopsourcerecommendbuybtnfontcolor]').val(),
                        "shopsourcerecommendbuybtnhoverfontcolor" : $('input[name=shopsourcerecommendbuybtnhoverfontcolor]').val(),
                        "shopsourcerecommendtitlehidden"          : $('input:radio[name=shopsourcerecommendtitlehidden]:checked').val(),
                        "addmoreheight"                           : $('input[name=addmoreheight]').val(),
                        "bgimgrepeat"                             : $('input:radio[name=bgimgrepeat]:checked').val(),
                        "nextpartheight"                          : $('input[name=nextpartheight]').val(),
                        "shopsourcerecommendhangnum"  : ($('input[name=shopsourcerecommendhangnum]').val()>hangnumMax)?hangnumMax : $('input[name=shopsourcerecommendhangnum]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });
            }

            function onPosterForm(){
                o_document.on("click","#J_shopposter_submit_save",function(){
                    var listimgidArr = [];
                    var listimgArr   = [];
                    var listgotoArr  = [];
                    var listordidArr = [];
                    $('input[name=shopposterlistimgid]').each(function(i,ele){
                        listimgidArr[i]= ele.value;
                    });
                    $('input[name=shopposterlistimg]').each(function(i,ele){
                        listimgArr[i]= ele.value;
                    });
                    $('input[name=shopposterlistgoto]').each(function(i,ele){
                        listgotoArr[i] = ele.value;
                    });
                    $('input[name=shopposterlistordid]').each(function(i,ele){
                        listordidArr[i]= Number(ele.value);
                    });
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopposterBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopposterheight"    : $('input[name=shopposterheight]').val(),
                        "shopposterbgcolor"   : $('input[name=shopposterbgcolor]').val(),
                        "shopposterlistimgid" : listimgidArr,
                        "shopposterlistimg"   : listimgArr,
                        "shopposterlistgoto"  : listgotoArr,
                        "shopposterlistordid" : listordidArr,
                        "nextpartheight"      : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });


                o_document.on("click",".J_del_shopposter",function(){
                    var thisid = $(this).attr('rel');
                        $.ajax({
                            url : "/custom/del_poster",
                            type : "POST",
                            dataType : "json",
                            data : {thisid:thisid,step:"del"},
                            success : function(res){
                            if(res.status == 0){
                                return false;
                            } else {
                               $('#posterlistli_'+thisid).remove();
                               custom_some_change = true;
                            }
                        }
                    });
                });

            }

            function onPosterTwoForm(){
                o_document.on("click","#J_shoppostertwo_submit_save",function(){
                    var listimgidArr = [];
                    var listimgArr   = [];
                    var listgotoArr  = [];
                    var listordidArr = [];
                    $('input[name=shoppostertwolistimgid]').each(function(i,ele){
                        listimgidArr[i]= ele.value;
                    });
                    $('input[name=shoppostertwolistimg]').each(function(i,ele){
                        listimgArr[i]= ele.value;
                    });
                    $('input[name=shoppostertwolistgoto]').each(function(i,ele){
                        listgotoArr[i] = ele.value;
                    });
                    $('input[name=shoppostertwolistordid]').each(function(i,ele){
                        listordidArr[i]= Number(ele.value);
                    });
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shoppostertwoBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shoppostertwoheight"    : $('input[name=shoppostertwoheight]').val(),
                        "shoppostertwobgcolor"   : $('input[name=shoppostertwobgcolor]').val(),
                        "shoppostertwolistimgid" : listimgidArr,
                        "shoppostertwolistimg"   : listimgArr,
                        "shoppostertwolistgoto"  : listgotoArr,
                        "shoppostertwolistordid" : listordidArr,
                        "nextpartheight"      : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });


                o_document.on("click",".J_del_shoppostertwo",function(){
                    var thisid = $(this).attr('rel');
                        $.ajax({
                            url : "/custom/del_poster",
                            type : "POST",
                            dataType : "json",
                            data : {thisid:thisid,step:"del"},
                            success : function(res){
                            if(res.status == 0){
                                return false;
                            } else {
                               $('#posterlistli_'+thisid).remove();
                               custom_some_change = true;
                            }
                        }
                    });
                });


            }

            function onPosterThreeForm(){
                o_document.on("click","#J_shopposterthree_submit_save",function(){
                    var listimgidArr = [];
                    var listimgArr   = [];
                    var listgotoArr  = [];
                    var listordidArr = [];
                    $('input[name=shopposterthreelistimgid]').each(function(i,ele){
                        listimgidArr[i]= ele.value;
                    });
                    $('input[name=shopposterthreelistimg]').each(function(i,ele){
                        listimgArr[i]= ele.value;
                    });
                    $('input[name=shopposterthreelistgoto]').each(function(i,ele){
                        listgotoArr[i] = ele.value;
                    });
                    $('input[name=shopposterthreelistordid]').each(function(i,ele){
                        listordidArr[i]= Number(ele.value);
                    });
                    var postData ={
                        step       : "saveform",
                        "boxname"  : "shopposterthreeBox",
                        "pageid"   : g_pageid,
                        "layoutid" : g_layoutid,
                        "spaceid"  : g_spaceid,
                        "shopposterthreeheight"    : $('input[name=shopposterthreeheight]').val(),
                        "shopposterthreebgcolor"   : $('input[name=shopposterthreebgcolor]').val(),
                        "shopposterthreelistimgid" : listimgidArr,
                        "shopposterthreelistimg"   : listimgArr,
                        "shopposterthreelistgoto"  : listgotoArr,
                        "shopposterthreelistordid" : listordidArr,
                        "nextpartheight"      : $('input[name=nextpartheight]').val()
                    };
                    var _store_boxformsave = CPK_store_boxformsave.createObj();
                    _store_boxformsave.storePartSettingSubmit(postData);
                    custom_some_change = true;
                });

                o_document.on("click",".J_del_shopposterthree",function(){
                    var thisid = $(this).attr('rel');
                        $.ajax({
                            url : "/custom/del_poster",
                            type : "POST",
                            dataType : "json",
                            data : {thisid:thisid,step:"del"},
                            success : function(res){
                            if(res.status == 0){
                                return false;
                            } else {
                               $('#posterlistli_'+thisid).remove();
                               custom_some_change = true;
                            }
                        }
                    });
                });


            }




            function onImgBoxInit(){

                if($("input[name=shopheaderimg]").length>0){
                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopheader",     //只是标识作用
                        "typename":"shopheaderpic",    //上传type
                        "inputname":"shopheaderimg",   //input
                        "autoSize" : true
                    });
                }

                if($("input[name=shopaboutbgimg]").length>0){
                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopabout",
                        "typename":"shopaboutbgpic",
                        "inputname":"shopaboutbgimg",
                        "autoSize" : true
                    });
                }

                if($("#J_shopbanner_submit_save").length>0){
                    var _uploadify = CPK_uploadify.createObj();
                    _uploadify.init({"uploadType": "banner","inputFileId":"#banner_file_upload","uploadLimit":10},function(uploadifyId,fileid,fileurl){
                        $("#j_bannerlist").prepend(_storebannerPrependHtml(fileid,fileurl));
                        $('#'+uploadifyId).find(".uploadify-progress div").css("width","100%");
                        setTimeout(function(){
                            $("#"+uploadifyId).hide();
                        },1000);
                    });

                }

                if($("input[name=shopcasebgimg]").length>0){

                    $("#casehangnumMax").html($("#casemore").attr("data-hangnumMax"));

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopcase",
                        "typename":"shopcasebgpic",
                        "inputname":"shopcasebgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopcasecatebgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopcasecate",
                        "typename":"shopcasecatebgpic",
                        "inputname":"shopcasecatebgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopcaserecommendbgimg]").length>0){

                    $("#caserecommendhangnumMax").html($("#caserecommendmore").attr("data-hangnumMax"));

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopcaserecommend",
                        "typename":"shopcaserecommendbgpic",
                        "inputname":"shopcaserecommendbgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopcontactbgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopcontact",
                        "typename":"shopcontactbgpic",
                        "inputname":"shopcontactbgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopinfobgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopinfo",
                        "typename":"shopinfobgimg",
                        "inputname":"shopinfobgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopnavbgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopnav",
                        "typename":"shopnavbgpic",
                        "inputname":"shopnavbgimg",
                        "autoSize" : true
                    });
                }


                if($("#J_shopposter_submit_save").length>0 ){
                    var _uploadify = CPK_uploadify.createObj();
                    _uploadify.init({"uploadType": "shopposter","inputFileId":"#poster_file_upload","uploadLimit":10},function(uploadifyId,fileid,fileurl){
                        $("#j_posterlist").prepend(_storeposterPrependHtml(fileid,fileurl));
                        $('#'+uploadifyId).find(".uploadify-progress div").css("width","100%");
                        setTimeout(function(){
                            $("#"+uploadifyId).hide();
                        },1000);
                    });

                }
                if($("#J_shoppostertwo_submit_save").length>0  ){
                    var _uploadify = CPK_uploadify.createObj();
                    _uploadify.init({"uploadType": "shoppostertwo","inputFileId":"#poster_file_upload","uploadLimit":10},function(uploadifyId,fileid,fileurl){
                        $("#j_posterlist").prepend(_storepostertwoPrependHtml(fileid,fileurl));
                        $('#'+uploadifyId).find(".uploadify-progress div").css("width","100%");
                        setTimeout(function(){
                            $("#"+uploadifyId).hide();
                        },1000);
                    });

                }
                if($("#J_shopposterthree_submit_save").length>0 ){
                    var _uploadify = CPK_uploadify.createObj();
                    _uploadify.init({"uploadType": "shopposterthree","inputFileId":"#poster_file_upload","uploadLimit":10},function(uploadifyId,fileid,fileurl){
                        $("#j_posterlist").prepend(_storeposterthreePrependHtml(fileid,fileurl));
                        $('#'+uploadifyId).find(".uploadify-progress div").css("width","100%");
                        setTimeout(function(){
                            $("#"+uploadifyId).hide();
                        },1000);
                    });

                }

                if($("input[name=shopservicebgimg]").length>0){

                    $("#servicehangnumMax").html($("#serviceTitle").attr("data-hangnumMax"));

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopservice",
                        "typename":"shopservicebgpic",
                        "inputname":"shopservicebgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopservicecatebgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopservicecate",
                        "typename":"shopservicecatebgpic",
                        "inputname":"shopservicecatebgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopservicerecommendbgimg]").length>0){

                    $("#servicerecommendhangnumMax").html($("#servicerecommendTitle").attr("data-hangnumMax"));

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopservicerecommend",
                        "typename":"shopservicerecommendbgpic",
                        "inputname":"shopservicerecommendbgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopsourcebgimg]").length>0){

                   $("#sourcehangnumMax").html($("#sourcemore").attr("data-hangnumMax"));

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopsource",
                        "typename":"shopsourcebgpic",
                        "inputname":"shopsourcebgimg",
                        "autoSize" : true
                    });
                }


                if($("input[name=shopsourcecatebgimg]").length>0){

                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopsourcecate",
                        "typename":"shopsourcecatebgpic",
                        "inputname":"shopsourcecatebgimg",
                        "autoSize" : true
                    });
                }

                if($("input[name=shopsourcerecommendbgimg]").length>0){

                    $("#sourcerecommendhangnumMax").html($("#sourcerecommendTitle").attr("data-hangnumMax"));
                    var templateUploadImg = CPK_imgbox_upload.createObj();
                    templateUploadImg.initUploadImg({
                        "modulename":"shopsourcerecommend",
                        "typename":"shopsourcerecommendbgpic",
                        "inputname":"shopsourcerecommendbgimg",
                        "autoSize" : true
                    });
                }

            }
            function _storebannerPrependHtml(fileid,fileurl){
                return ' <li class="clearfix" id="bannerlistli_'+fileid+'">\
                        <div class="listBannerimg fl">\
                            <a href="'+fileurl+'" rel="group"><img  src="'+fileurl+'" width="300" height="100"></a>\
                            <input type="hidden" name="shopbannerlistimgid" value="'+fileid+'">\
                            <input type="hidden" name="shopbannerlistimg" value="'+fileurl+'">\
                        </div>\
                        <div class="listBannerinfo fl">\
                            <div><input type="text" placeholder="例:http://www.123.com" name="shopbannerlistgoto" value=""  style="" ></div>\
                            <div>\
                                <div class="fl mr_10"><a class="bannerDelBtn J_del_shopbanner" href="javascript:;" rel="'+fileid+'">删除</a></div>\
                                <div class="fl">排序：<input type="text" name="shopbannerlistordid" value="" style="width:40px;"></div>\
                            </div>\
                        </div>\
                    </li>';
            }
            function _storeposterPrependHtml(fileid,fileurl){
                return ' <li class="clearfix" id="posterlistli_'+fileid+'">\
                        <div class="listposterimg fl">\
                            <a href="'+fileurl+'" rel="group"><img  src="'+fileurl+'" width="300" height="100"></a>\
                            <input type="hidden" name="shopposterlistimgid" value="'+fileid+'">\
                            <input type="hidden" name="shopposterlistimg" value="'+fileurl+'">\
                        </div>\
                        <div class="listposterinfo fl">\
                            <div><input type="text" placeholder="例:http://www.123.com" name="shopposterlistgoto" value=""  style="" ></div>\
                            <div>\
                                <div class="fl mr_10"><a class="posterDelBtn J_del_shopposter" href="javascript:;" rel="'+fileid+'">删除</a></div>\
                                <div class="fl">排序：<input type="text" name="shopposterlistordid" value="" style="width:40px;"></div>\
                            </div>\
                        </div>\
                    </li>';
            }
            function _storepostertwoPrependHtml(fileid,fileurl){
                return ' <li class="clearfix" id="posterlistli_'+fileid+'">\
                        <div class="listposterimg fl">\
                            <a href="'+fileurl+'" rel="group"><img  src="'+fileurl+'" width="300" height="100"></a>\
                            <input type="hidden" name="shoppostertwolistimgid" value="'+fileid+'">\
                            <input type="hidden" name="shoppostertwolistimg" value="'+fileurl+'">\
                        </div>\
                        <div class="listposterinfo fl">\
                            <div><input type="text" placeholder="例:http://www.123.com" name="shoppostertwolistgoto" value=""  style="" ></div>\
                            <div>\
                                <div class="fl mr_10"><a class="posterDelBtn J_del_shoppostertwo" href="javascript:;" rel="'+fileid+'">删除</a></div>\
                                <div class="fl">排序：<input type="text" name="shoppostertwolistordid" value="" style="width:40px;"></div>\
                            </div>\
                        </div>\
                    </li>';
            }
            function _storeposterthreePrependHtml(fileid,fileurl){
                return ' <li class="clearfix" id="posterlistli_'+fileid+'">\
                        <div class="listposterimg fl">\
                            <a href="'+fileurl+'" rel="group"><img  src="'+fileurl+'" width="300" height="100"></a>\
                            <input type="hidden" name="shopposterthreelistimgid" value="'+fileid+'">\
                            <input type="hidden" name="shopposterthreelistimg" value="'+fileurl+'">\
                        </div>\
                        <div class="listposterinfo fl">\
                            <div><input type="text" placeholder="例:http://www.123.com" name="shopposterthreelistgoto" value=""  style="" ></div>\
                            <div>\
                                <div class="fl mr_10"><a class="posterDelBtn J_del_shopposterthree" href="javascript:;" rel="'+fileid+'">删除</a></div>\
                                <div class="fl">排序：<input type="text" name="shopposterthreelistordid" value="" style="width:40px;"></div>\
                            </div>\
                        </div>\
                    </li>';
            }

            function onHideOrShowSpaceBtn(){
                o_document.on("click",".J_block_together",function(){
                    var o_this = $(this);
                    o_this.toggle(function(e){
                        var spaceid = o_this.attr("data-spaceid");
                        o_this.addClass("down");
                        $("#commonSpace"+spaceid).animate({height: 10});
                    },function(){
                        var spaceid = o_this.attr("data-spaceid");
                        var spaceheight = o_this.attr("data-height");
                        o_this.removeClass("down");
                        $("#commonSpace"+spaceid).animate({height: spaceheight});
                    });
                    o_this.trigger('click');
                });
            }

            function onSplitSpaceBtn(){
                o_document.on("click",".J_split_space",function(){
                    var oThis    = $(this);
                    var spaceid  = oThis.attr("data-spaceid");
                    $.ajax({
                        url : '/custom/splitSpace',
                        type : "POST",
                        dataType : "json",
                        data : {spaceid:spaceid,pageid:g_pageid,layoutid:g_layoutid},
                        success : function(res){
                            if(res.status==1){
                                if(res.data.width==0){
                                    var o_block = $("#commonSpace"+spaceid+"block");
                                    o_block.html("");
                                    o_block.append('<div id="commonSpace'+parseInt(parseInt(spaceid)+100)+'block" class="spaceBlock"><div id="commonSpace'+parseInt(parseInt(spaceid)+100)+'" class="inedit space spaceline" style="height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+parseInt(parseInt(spaceid)+100)+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+parseInt(parseInt(spaceid)+100)+'" data-height="'+(res.data.height/2-8)+'"></a></div></div>');
                                    o_block.append('<div id="commonSpace'+parseInt(parseInt(spaceid)+200)+'block" class="spaceBlock"><div id="commonSpace'+parseInt(parseInt(spaceid)+200)+'" class="inedit space spaceline" style="height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+parseInt(parseInt(spaceid)+200)+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+parseInt(parseInt(spaceid)+200)+'" data-height="'+(res.data.height/2-8)+'"></a></div></div>');
                                }else{
                                    var o_block = $("#commonSpace"+spaceid+"block");
                                    o_block.html("");
                                    o_block.append('<div id="commonSpace'+parseInt(parseInt(spaceid)+100)+'block" class="spaceBlock"><div id="commonSpace'+parseInt(parseInt(spaceid)+100)+'" class="inedit space spaceline" style="width:'+(res.data.width-14)+'px;height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+parseInt(parseInt(spaceid)+100)+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+parseInt(parseInt(spaceid)+100)+'" data-height="'+(res.data.height/2-8)+'"></a></div></div>');
                                    o_block.append('<div id="commonSpace'+parseInt(parseInt(spaceid)+200)+'block" class="spaceBlock"><div id="commonSpace'+parseInt(parseInt(spaceid)+200)+'" class="inedit space spaceline" style="width:'+(res.data.width-14)+'px;height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+parseInt(parseInt(spaceid)+200)+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+parseInt(parseInt(spaceid)+200)+'" data-height="'+(res.data.height/2-8)+'"></a></div></div>');
                                }
                                custom_some_change = true;
                            }else{
                                $.cpk_alert(res.msg);
                            }
                        }
                    });
                });
            }

            function onJoinSpaceBtn(){
                o_document.on("click",".J_join_space",function(){
                    var oThis    = $(this);
                    var spaceid  = oThis.attr("data-spaceid");
                    $.ajax({
                        url : '/custom/joinSpace',
                        type : "POST",
                        dataType : "json",
                        data : {spaceid:spaceid,pageid:g_pageid,layoutid:g_layoutid},
                        success : function(res){
                            if(res.status==1){
                                custom_some_change = false;
                                location.reload();//刷新比较合理
                            }
                        }
                    });
                });
            }

            function onDelSpaceContent(){
                o_document.on("click",".J_del_block",function(){
                    var oThis    = $(this);
                    var spaceid  = oThis.attr("data-spaceid");
                    var boxname  = oThis.attr("data-boxname");
                    $.ajax({
                        url : '/custom/delBlock',
                        type : "POST",
                        dataType : "json",
                        data : {spaceid:spaceid,pageid:g_pageid,layoutid:g_layoutid,boxname:boxname},
                        success : function(res){
                            if(res.status==1){
                                $("#"+boxname).show();
                                if(spaceid>100){
                                    if(res.data.width==0){
                                        $("#commonSpace"+spaceid+"block").html('<div id="commonSpace'+spaceid+'" class="inedit space spaceline" style="height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+spaceid+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+spaceid+'" data-height="'+(res.data.height/2-8)+'"></a></div>');
                                    }else{
                                        $("#commonSpace"+spaceid+"block").html('<div id="commonSpace'+spaceid+'" class="inedit space spaceline" style="width:'+(res.data.width-14)+'px;height:'+(res.data.height/2-8)+'px;line-height:'+(res.data.height/2-8)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_join_space space_join" title="合" data-spaceid="'+spaceid+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+spaceid+'" data-height="'+(res.data.height/2-8)+'"></a></div>');
                                    }
                                }else{
                                    if(res.data.width==0){
                                        $("#commonSpace"+spaceid+"block").html('<div id="commonSpace'+spaceid+'" class="inedit space spaceline" style="height:'+(res.data.height-4)+'px;line-height:'+(res.data.height-4)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_split_space space_split" title="拆" data-spaceid="'+spaceid+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+spaceid+'" data-height="'+(res.data.height-4)+'"></a></div>');
                                    }else{
                                        $("#commonSpace"+spaceid+"block").html('<div id="commonSpace'+spaceid+'" class="inedit space spaceline" style="width:'+(res.data.width-14)+'px;height:'+(res.data.height-4)+'px;line-height:'+(res.data.height-4)+'px;text-align: center;font-size:30px;">'+res.data.spacename+'<a href="javascript:;" class="J_split_space space_split" title="拆" data-spaceid="'+spaceid+'" ></a></div><div class="inedit editDiv clearfix"><a href="javascript:;" class="block-together J_block_together" title="收缩" data-spaceid="'+spaceid+'" data-height="'+(res.data.height-4)+'"></a></div>');
                                    }
                                }
                                custom_some_change = true;
                            }else{
                                //todo
                            }
                        }
                    });
                });
            }
            //获取元素位置
            function getPos(obj) {
                var boxOffset = obj.offset();
                if(boxOffset){
                    iTop  = boxOffset.top;
                    iLeft = boxOffset.left + 0;
                }else{
                    iTop  = 0;
                    iLeft = 0;
                }
                return {top:iTop, left:iLeft}   
            };
            function onfreedomBoxMove(){
                o_document.on("mousedown",".box",function(e){
                    startListenMove();
                    boxDown       = true;
                    var csstop    = $(this).css("top");
                    var cssleft   = $(this).css("left");
                    var boxOffset = getPos($(this));
                    var boxname   = $(this).attr("id");
                    $("#"+boxname+"Content").hide();

                    this.posix = {'x': e.pageX - boxOffset.left,'y' : e.pageY - boxOffset.top};
                    $.extend(document, {'takemove': true, 'move_target': this,'targetCssTop' : csstop ,"targetCssLeft" : cssleft});
                });

            }
            var startListenMove = function(){
                o_document.on("mousemove",function(e){
                    //去除被选中时，后面背景一片蓝
                    if(window.getSelection && !!this.takemove){
                        window.getSelection().removeAllRanges(); //w3c
                    }else  if(document.selection && !!this.takemove){
                        document.selection.empty();//IE
                    }
                    if(!!this.takemove){
                        var posix = !this.move_target ? {'x' : 0 , 'y' : 0} : this.move_target.posix,
                            startMove = function(){
                                $(this.move_target).css({
                                    'top'  : e.pageY - posix.y  - scrollTop,
                                    'left' : e.pageX - posix.x
                                });
                            }
                        startMove.call(this, e, posix);
                        inSpace = checkIn( this.move_target);
                    }
                }).on("mouseup",function(e){
                    boxDown = false;
                    if(!!this.takemove){
                        $(".space").css({"borderColor":"#000","color":"#000"});
                        $(this.move_target).css({
                            'top'  : this.targetCssTop ,
                            'left' : this.targetCssLeft 
                        });

                        if(inSpace){
                            var move_target_jqObj = $(this.move_target);
                            var template_id       = move_target_jqObj.attr("data-templateid");
                            var boxname           = this.move_target_id.toString();
                            var spaceidname       = this.space_target_id;
                            var spaceid           = spaceidname.replace(/[^0-9]+/g, '');
                            move_target_jqObj.hide();
                            $.ajax({
                                url : '/custom/getFreedomBlock',
                                type : "POST",
                                dataType : "json",
                                data : {partname:this.move_target_id,template_id:template_id,spaceid:spaceid,pageid:pageid,layoutid:layoutid},
                                success : function(res){
                                },
                                error :function(error){
                                    $("#"+spaceidname+"block").html(error.responseText);
                                    if(spaceid>2){
                                        $("#"+spaceidname+"block").prepend('<div class="inedit editDiv"><a href="javascript:;" class="block-cancel J_del_block" title="删除" data-spaceid="'+spaceid+'"  data-boxname="'+boxname+'">删除</a><a href="javascript:;" class="block-setting J_setting_block" title="设置" data-spaceid="'+spaceid+'"  data-boxname="'+boxname+'" data-partcnname="'+partcnname[boxname]+'">设置</a></div>');
                                    }else{
                                        $("#"+spaceidname+"block").prepend('<div class="inedit editDiv"><a href="javascript:;" class="block-setting J_setting_block" title="设置" data-spaceid="'+spaceid+'"  data-boxname="'+boxname+'" data-partcnname="'+partcnname[boxname]+'">设置</a></div>');
                                    }
                                    custom_some_change = true;
                                }
                            });
                        }
                        $.extend(this,{"takemove":false,"move_target":null,"targetCssTop":null,"targetCssLeft":null,"move_target_id":null,"space_target_id":null});
                    }
                });
            }
            function checkIn(obj1){
                var objID = obj1.id;
                var jqueryObj1 = $("#"+objID);

                var x1 = getPos(jqueryObj1).left;
                var y1 = getPos(jqueryObj1).top;
                var w1 = obj1.offsetWidth;
                var h1 = obj1.offsetHeight;
                
                var oneisin =false;
                $(".spaceline").each(function(i,value){
                    var jqueryObj2 = $(value);
                    var obj2  = jqueryObj2[0];
                    if(obj2){
                        var x2 = getPos(jqueryObj2).left;
                        var y2 = getPos(jqueryObj2).top;
                        var w2 = obj2.offsetWidth;
                        var h2 = obj2.offsetHeight;

                        var isIn = aabb(x1, y1, w1, h1,x2,y2, w2,h2);
                        if(isIn){
                           oneisin = true;
                           $.extend(document,{"move_target_id":objID,"space_target_id":$(value).attr("id")});
                           obj2.style.borderColor="#3366FF";
                           obj2.style.color="#3366FF";
                        }else{
                           obj2.style.borderColor="#000";
                           obj2.style.color="#000";
                        }
                    }
                });
                return oneisin;

            }
            function aabb(x1,y1,w1,h1,x2,y2,w2,h2) {  
                if (x1 >= x2 && x1 >= x2 + w2) {  
                    return false;  
                } else if (x1 <= x2 && x1 + w1 <= x2) {  
                    return false;  
                } else if (y1 >= y2 && y1 >= y2 + h2) {  
                    return false;  
                } else if (y1 <= y2 && y1 + h1 <= y2) {  
                    return false;  
                }  
                return true;  
            }  
            
            return obj;
        }
    }
    return CPK_user_freedom;
});
